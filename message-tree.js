// @flow

/*::
type Message = string
type MessageBinaryTree = [
  MessageBinaryTree | Message | null,
  MessageBinaryTree | Message | null
]
*/

function addMessage (
  messageTree/*: MessageBinaryTree */,
  message/* :Message */
)/*: MessageBinaryTree */ {
  // The next function has a slightly different signature, so encapsulate it in a new
  // function.
  const newTree = addMessageRecursively(messageTree, message)
  if (!newTree) {
    return [messageTree, [message, null]]
  }
  return newTree
}

function addMessageRecursively (
  messageTree/*: MessageBinaryTree | Message */,
  message/* :Message */
) {
  if (typeof messageTree === 'string') {
    // This is a message, we can't add it here so bail out.
    return null
  }
  const [left, right] = messageTree

  if (left === null) {
    // This case only happens on a brand new tree of [null, null]
    return [message, null]
  }

  if (right === null) {
    if (typeof left === 'string') {
      // Fill in the empty right side.
      return [left, message]
    }
    // The left tree could be added too, or it could be full.
    const newTree = addMessageRecursively(left, message)
    if (!newTree) {
      // The tree couldn't be added to, so add it to the right hand side.
      return [left, [message, null]]
    }
    return [left, newTree]
  }

  if (typeof left === 'string') {
    // Both of the sides are messages, so insert a new message.
    return [messageTree, [message, null]]
  }
  if (typeof right === 'string') {
    // This tree is full and can't be added to.
    return null
  }

  // Try to add it to the right hand tree.
  const newTree = addMessageRecursively(right, message)
  if (!newTree) {
    // The right side was full too, create a new outer layer.
    return [messageTree, [message, null]]
  }
  // We added it to the right hand side.
  return [left, newTree]
}

function testTree () {
  let messageTree = [null, null]
  messageTree = addMessage(messageTree, 'Message 1')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 2')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 3')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 4')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 5')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 6')
  console.log(JSON.stringify(messageTree))
  messageTree = addMessage(messageTree, 'Message 7')
  console.log(JSON.stringify(messageTree, null, 2))
}

testTree()
