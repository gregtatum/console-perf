// @flow

/**
 *
 * The addMessage function creates a MessageBinaryTree. This binary tree only has
 * messages at the very leaf nodes. So it takes the form.
 *
 *  T: MessageBinaryTree node
 *  m: Message
 *  o: null
 *
 * Add a message to a tree with 2 messages.
 *
 *         T                      T
 *       ↙  ↘       ->         ↙     ↘
 *      m    m               T         T
 *                         ↙  ↘       ↙  ↘
 *                        m    m     m    o
 *
 * This is even more dramatic on a tree with more nodes:
 *
 *            T                       T
 *         ↙     ↘       ->        ↙     ↘
 *       T         T             T         T
 *     ↙  ↘       ↙  ↘         ↙  ↘       ↙  ↘
 *    m    m     m    o       T    T     T    T
 *                           ↙ ↘  ↙ ↘   ↙ ↘  ↙ ↘
 *                           m m  m m   m o  o o
*/

/*::
type Message = string
type MessageBinaryTree = {|
  left: MessageBinaryTree | Message | null,
  right: MessageBinaryTree | Message | null,
  depth: number,
  emptySlots: number,
|}
*/

const EMPTY_TREE = Object.freeze({
  left: null,
  right: null,
  depth: 0,
  emptySlots: 2
})

function addMessage (
  messageTree/*: ?MessageBinaryTree */,
  message/* :Message */
)/*: MessageBinaryTree */ {
  // The next function has a slightly different signature, so encapsulate it in a new
  // function.
  if (!messageTree) {
    messageTree = EMPTY_TREE
  }
  if (messageTree.emptySlots > 0) {
    const newTree = addMessageRecursively(
      messageTree,
      message
    )
    if (!newTree) {
      throw new Error(
        'The message tree was supposed to have some empty slots, but it did not.'
      );
    }
    return newTree
  }

  // Create a tree of equal depth as the original, but only have 1 message in it.
  const newSparseTree = addMessageRecursively(
    createEmptyTreeOfDepth(messageTree.depth),
    message
  )
  if (newSparseTree === null) {
    throw new Error('The sparse tree must be created given an empty tree.')
  }

  return {
    left: messageTree,
    right: newSparseTree,
    depth: messageTree.depth + 1,
    emptySlots: newSparseTree.emptySlots
  }
}

function createEmptyTreeOfDepth (
  depth/* :number */
)/* :MessageBinaryTree */ {
  if (depth === 0) {
    return EMPTY_TREE
  }
  return {
    left: createEmptyTreeOfDepth(depth - 1),
    right: createEmptyTreeOfDepth(depth - 1),
    depth,
    emptySlots: Math.pow(depth, 2)
  }
}

function addMessageRecursively (
  messageTree/*: MessageBinaryTree | Message */,
  message/* :Message */
)/*: MessageBinaryTree | null */ {
  if (typeof messageTree === 'string') {
    // This is a message, we can't add it here so bail out.
    return null
  }
  const {left, right} = messageTree

  if (left === null) {
    if (right !== null) {
      throw new Error("If the left side is null, the right must be null as well")
    }
    // This is a totally null leaf node, fill in the left.
    return {
      left: message,
      right: null,
      depth: 0,
      emptySlots: 1,
    }
  }

  if (right === null) {
    if (!typeof left === 'string') {
      throw new Error("If the right side is null, the left must be a message")
    }
    // This is a leaf node, with a null right side.
    return {
      left: left,
      right: message,
      depth: 0,
      emptySlots: 0,
    }
  }

  if (typeof left === 'string') {
    if (!typeof right === 'string') {
      throw new Error('If the left side is a message, then the right must be one too.')
    }
    return null
  }
  if (typeof right === 'string') {
    throw new Error('Right side cannot be a message when the left is not one too.')
  }

  if (left.emptySlots > 0) {
    // The left side has empty slots, fill one in.
    const newLeft = addMessageRecursively(left, message)
    if (!newLeft) {
      throw new Error("The left said there were empty slots, but none was found.");
    }
    return {
      left: newLeft,
      right,
      depth: messageTree.depth,
      emptySlots: newLeft.emptySlots + right.emptySlots
    }
  }

  if (right.emptySlots > 0) {
    // The left side has empty slots, fill one in.
    const newRight = addMessageRecursively(right, message)
    if (!newRight) {
      throw new Error("The left said there were empty slots, but none was found.");
    }
    return {
      left,
      right: newRight,
      depth: messageTree.depth,
      emptySlots: newRight.emptySlots
    }
  }

  // No empty slots were found
  return null
}

function testTree () {
  let messageTree = null
  messageTree = addMessage(messageTree, 'Message 0')
  console.assert(
    humanReadableTree(messageTree) === [
      '0)',
      '  Message 0',
      '  (empty)',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 1')
  console.assert(
    humanReadableTree(messageTree) === [
      '0)',
      '  Message 0',
      '  Message 1',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 2')
  console.assert(
    humanReadableTree(messageTree) === [
      '1)',
      '  0)',
      '    Message 0',
      '    Message 1',
      '  0)',
      '    Message 2',
      '    (empty)',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 3')
  console.assert(
    humanReadableTree(messageTree) === [
      '1)',
      '  0)',
      '    Message 0',
      '    Message 1',
      '  0)',
      '    Message 2',
      '    Message 3',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 4')
  console.assert(
    humanReadableTree(messageTree) === [
      '2)',
      '  1)',
      '    0)',
      '      Message 0',
      '      Message 1',
      '    0)',
      '      Message 2',
      '      Message 3',
      '  1)',
      '    0)',
      '      Message 4',
      '      (empty)',
      '    0)',
      '      (empty)',
      '      (empty)',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 5')
  console.assert(
    humanReadableTree(messageTree) === [
      '2)',
      '  1)',
      '    0)',
      '      Message 0',
      '      Message 1',
      '    0)',
      '      Message 2',
      '      Message 3',
      '  1)',
      '    0)',
      '      Message 4',
      '      Message 5',
      '    0)',
      '      (empty)',
      '      (empty)',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 6')
  console.assert(
    humanReadableTree(messageTree) === [
      '2)',
      '  1)',
      '    0)',
      '      Message 0',
      '      Message 1',
      '    0)',
      '      Message 2',
      '      Message 3',
      '  1)',
      '    0)',
      '      Message 4',
      '      Message 5',
      '    0)',
      '      Message 6',
      '      (empty)',
    ].join('\n')
  )

  messageTree = addMessage(messageTree, 'Message 7')
  console.assert(
    humanReadableTree(messageTree) === [
      '2)',
      '  1)',
      '    0)',
      '      Message 0',
      '      Message 1',
      '    0)',
      '      Message 2',
      '      Message 3',
      '  1)',
      '    0)',
      '      Message 4',
      '      Message 5',
      '    0)',
      '      Message 6',
      '      Message 7',
    ].join('\n')
  )
}

testTree()

function logNicely(
  messageTree/* :MessageBinaryTree */
) {
  console.log('-------------------------')
  console.log(humanReadableTree(messageTree))
}

function humanReadableTree(
  messageTree/* :MessageBinaryTree */
)/* :string */ {
  let result = []
  const INSET_STRING = '  '
  function walk (messageTree, inset = '') {
    if (typeof messageTree === 'string') {
      result.push(inset + messageTree)
      return
    }
    if (!messageTree) {
      result.push(inset + '(empty)')
      return
    }
    result.push(inset + messageTree.depth + ')')
    walk(messageTree.left, inset + INSET_STRING),
    walk(messageTree.right, inset + INSET_STRING)
  }
  walk(messageTree)
  return result.join('\n')
}
