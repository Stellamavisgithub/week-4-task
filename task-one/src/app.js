import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  let childrenObject = input.slice(0,1);
   input.shift()
   input.sort((a,b) => { return a.id - b.id})
   input.unshift(childrenObject);
    for (let i=1; i< input.length; i++) {
     input[i].parentId = input[i-1].id;
    }
    
  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}