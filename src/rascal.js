export function workspaceToRascal(workspace) {
  var code = "";
  var blocks = workspace.getTopBlocks(true);
  for (var i = 0, block; block = blocks[i]; i++) {
      var line = blockToRascal(block);
      code += line + "\n";
  }
  return code;
}
  
/* Create a javascript function to convert a blockly block to the above Rascal as string */
function blockToRascal(block) {
  var compact = false;

  if (!block)
  {
    return ""
  }
  var code = "";
  var type = block.type;
  var id = block.id;
  const fields = Object.create(null);
  var doFullSerialization = false;
  var next = blockToRascal(block.getNextBlock());
  if (next=="")
  {
    if (compact) 
    { 
      next = ""
    }
    else {
      next = ", null()"
    }
  }
  else
  {
    next = ", " + next
  }
  var fields_str = "";
  
  for (let i = 0, input; input = block.inputList[i]; i++) {
    for (let j = 0, field; field = input.fieldRow[j]; j++) {
      if (field.isSerializable()) {
        fields[field.name] = field.saveState(doFullSerialization);
        fields_str += '"' + field.name + '" : "'+ field.saveState(doFullSerialization) + '", ' 
      }
    }
  }
  if(fields_str)
  {
      fields_str = ', (' + fields_str.slice(0, -2) + ')' // remove the last comma
  }
  else
  {
    if (compact) 
    {   
      fields_str = ''
    }
    else
    {
      fields_str =  ", ()"
    }
  }
  
  
  var inputs_str = "";
  for (let i = 0, input; input = block.inputList[i]; i++) {
    const input = block.inputList[i];
    if (input.connection)
    { 
      const child = input.connection.targetBlock();
      var ret = blockToRascal(child)
      if (ret=="")
      {
        ret = "null()"
      }
      inputs_str += '"' + input.name + '":' + ret + ', '
    }
  }
  if (inputs_str)
  {
    inputs_str = ', (' + inputs_str.slice(0, -2) + ')' // remove the last comma
  }
  else
  {
    if (compact)
    {  
      inputs_str = '';
    }
    else
    {
      inputs_str = ", ()"
    } 

  }
  
  code = 'block("' + type + '", "' + id + '"'+ fields_str + inputs_str + next + ")";
  return code;
}
