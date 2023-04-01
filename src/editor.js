
import * as Blockly from 'blockly';
import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
import { CrossTabCopyPaste } from '@blockly/plugin-cross-tab-copy-paste';
import { blocks } from 'blockly/blocks';
import * as Rascal from './rascal.js';
import * as Match from './match.js';


Blockly.Blocks['match_replace'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Match:");
      this.appendStatementInput("MATCH")
          .setCheck(null);
      this.appendDummyInput()
          .appendField("Replace all matches by:");
      this.appendStatementInput("REPLACE")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
   this.setTooltip("");
   this.setHelpUrl("");
    },
  
  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['match_tree'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("$tree", null, ), "TREE");
    this.setPreviousStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['match_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("$tree", null, ), "TREE");
    this.setOutput(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};


Blockly.Blocks['node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("name", null, ), "NAME");
    this.appendStatementInput("CHILDS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['token'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("value", null, ), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
        }
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
      {  
        if (field.getOptions && !field.variable_) // is dropdown and not a variable
        {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
        }
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};




Blockly.Blocks['basic_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("list");
    this.appendStatementInput("LIST")
        .setCheck("value");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};



Blockly.Blocks['basic_dict'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("dict");
    this.appendStatementInput("LIST")
        .setCheck("key_value");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['basic_list_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("list_value", null, ), "VALUE");
    this.setPreviousStatement(true, "value");
    this.setNextStatement(true, "value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['basic_key_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("value", null, ), "VALUE");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['basic_key_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(": list ");
    this.appendStatementInput("LIST")
        .setCheck("value");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

Blockly.Blocks['basic_key_dict'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("key", null, ), "KEY")
        .appendField(": dict");
    this.appendStatementInput("LIST")
        .setCheck("key_value");
    this.setPreviousStatement(true, "key_value");
    this.setNextStatement(true, "key_value");
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },

  /*
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var field;
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var dropdown = Blockly.utils.xml.createElement('dropdown');
          dropdown.setAttribute('field', field.name);
        
          container.appendChild(dropdown)
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option = Blockly.utils.xml.createElement('option');
            option.setAttribute('text', options[i][0]);
            option.setAttribute('id', options[i][1]);
            dropdown.appendChild(option);
          }
    		}
      }
    }
    return container;
  },
  saveExtraState: function() {
    var field;
    var state = {'dropdowns':[]};
    for (var b = 0, input; input = this.inputList[b]; b++)
    {
      for (var d = 0, field; field = input.fieldRow[d]; d++)
	    {	
	      if (field.getOptions && !field.variable_) // is dropdown and not a variable
		    {
          var field_state = {'field':field.name, 'options' : []}
          state.dropdowns.push(field_state);
          var options = field.getOptions()
          for (var i = 0; i < options.length; i++) {
            var option_state = {'text': options[i][0], 'id':options[i][1]}
            field_state.options.push(option_state)
          }
    		}
      }
    }
    return state;
  },

  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {

    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'dropdown') {
        var field_name = childNode.getAttribute('field');
        var field = this.getField(field_name);
    
        var options = field.getOptions(false)
        var ids = options.map(option => option[1]);
        
        for (var j = 0, optionsElement; (optionsElement = childNode.childNodes[j]); j++) {
          if (optionsElement.nodeName.toLowerCase() == 'option') {
            var text = optionsElement.getAttribute('text');
            var id = optionsElement.getAttribute('id');
            if (!ids.includes(id)) {
              options.push([text,id])
            }
          }
        }
        field.savedOptionsSet = true;     
      }
    }
  },
  loadExtraState: function(state) {
    for (var i=0; i<state.dropdowns.length; i++)
    {
      var field_name = state.dropdowns[i].field;
      var field = this.getField(field_name);
      if (field.getOptions && !field.variable_) // is dropdown and not a variable
      { 
         var options = field.getOptions(false);
      }
      else
      {
        var options = []
      }
      var ids = options.map(option => option[1]);
      for (var j =0; j<state.dropdowns[i].options.length;j++)
      {
        var text = state.dropdowns[i].options[j].text;
        var id = state.dropdowns[i].options[j].id;
        if (!ids.includes(id)) {
          options.push([text,id])
        }
      }
      field.savedOptionsSet = true;
    }
  }



};

if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_key_dict'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_dict'
  code += '", \n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_list'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_list'
  code += '," # key_value with KEY = "';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" should create block with type: ';
  code += 'basic_key_list'
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_dict'] = function(block) {
  var code ='';
  code += '{\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += '}';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_dict'] = function(block) {
  var code ='';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_dict'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_key_value'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  code += 'basic_key_value'
  code += '", ';
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_value'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : "';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '"';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_value'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ' : ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_dict'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '": {\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += '}';
  if(block.getNextBlock()) {code += ","};
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_dict'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ':\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_key_list'] = function(block) {
  var code ='';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += ':\n';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_key_list'] = function(block) {
  var code ='';
  code += '"';
  var field = block.getField('KEY');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '" : [\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ']\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JSON) {
  Blockly.JSON = new Blockly.Generator('JSON');
  Blockly.JSON.ORDER_ATOMIC = 0;
}

Blockly.JSON.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JSON.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JSON['basic_list'] = function(block) {
  var code ='';
  code += '[\n';
  code += Blockly.JSON.statementToCode(block, 'LIST');
  code += ']';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JSON.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_list'] = function(block) {
  var code ='';
  code += Blockly.JavaScript.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_list'] = function(block) {
  var code ='';
  code += Blockly.YAML.statementToCode(block, 'LIST');

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.YAML) {
  Blockly.YAML = new Blockly.Generator('YAML');
  Blockly.YAML.ORDER_ATOMIC = 0;
}

Blockly.YAML.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.YAML.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.YAML['basic_list_value'] = function(block) {
  var code ='';
  code += '- ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.YAML.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
if (!Blockly.JavaScript) {
  Blockly.JavaScript = new Blockly.Generator('JavaScript');
  Blockly.JavaScript.ORDER_ATOMIC = 0;
}

Blockly.JavaScript.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : Blockly.JavaScript.blockToCode(nextBlock);
    return code + nextCode;
}

Blockly.JavaScript['basic_list_value'] = function(block) {
  var code ='';
  code += '- ';
  var field = block.getField('VALUE');
  if (field.getText()) {
    code += field.getText();
  } else {
    code += field.getValue();
  }
  code += '\n';

  // if this block is a 'value' then code + ORDER needs to be returned
  if(block.outputConnection) {
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else // no value block
  {
    return code;
  }
}
;
/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Loading and saving blocks with localStorage and cloud storage.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

// Create a namespace.
var BlocklyStorage = {};



BlocklyStorage.HTTPREQUEST_ERROR = 'There was a problem with the request.\n';
BlocklyStorage.LINK_ALERT = 'Share your blocks with this link:\n\n%1';
BlocklyStorage.HASH_ERROR = 'Sorry, "%1" doesn\'t correspond with any saved Blockly file.';
BlocklyStorage.XML_ERROR = 'Could not load your saved file.\n' +
		'Perhaps it was created with a different version of Blockly?';

/**
 * Backup code blocks to localStorage.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.backupBlocks_ = function(workspace, id) {
  if ('localStorage' in window) {
    var json_text = Blockly.serialization.workspaces.save(workspace);
    // Gets the current URL, not including the hash.
    var url = window.location.href.split('#')[0]+id+'.json';
    window.localStorage.setItem(url, JSON.stringify(json_text));
  }
};

/**
 * Bind the localStorage backup function to the unload event.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.backupOnUnload = function(opt_workspace,id) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  window.addEventListener('unload',
      function() {BlocklyStorage.backupBlocks_(workspace,id);}, false);
};

/**
 * Restore code blocks from localStorage.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.restoreBlocks = function(opt_workspace, id) {
  var url = window.location.href.split('#')[0];
  if ('localStorage' in window && window.localStorage[url+id+'.json']) {
    var workspace = opt_workspace || Blockly.getMainWorkspace();
    var json = JSON.parse(window.localStorage[url+id+'.json']);
    Blockly.serialization.workspaces.load(json, workspace);
   }
};

/**
 * Save blocks to database and return a link containing key to XML.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.link = function(opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  var xml = Blockly.Xml.workspaceToDom(workspace, true);
  // Remove x/y coordinates from XML if there's only one block stack.
  // There's no reason to store this, removing it helps with anonymity.
  if (workspace.getTopBlocks(false).length == 1 && xml.querySelector) {
    var block = xml.querySelector('block');
    if (block) {
      block.removeAttribute('x');
      block.removeAttribute('y');
    }
  }
  var data = Blockly.Xml.domToText(xml);
  BlocklyStorage.makeRequest_('/storage', 'xml', data, workspace, editor);
};

/**
 * Retrieve XML text from database using given key.
 * @param {string} key Key to XML, obtained from href.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyStorage.retrieveXml = function(key, opt_workspace, editor) {
  var workspace = opt_workspace || Blockly.getMainWorkspace();
  BlocklyStorage.makeRequest_('/storage', 'key', key, workspace, editor);
};

/**
 * Global reference to current AJAX request.
 * @type {XMLHttpRequest}
 * @private
 */
BlocklyStorage.httpRequest_ = null;

/**
 * Fire a new AJAX request.
 * @param {string} url URL to fetch.
 * @param {string} name Name of parameter.
 * @param {string} content Content of parameter.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.makeRequest_ = function(url, name, content, workspace, editor) {
  if (BlocklyStorage.httpRequest_) {
    // AJAX call is in-flight.
    BlocklyStorage.httpRequest_.abort();
  }
  BlocklyStorage.httpRequest_ = new XMLHttpRequest();
  BlocklyStorage.httpRequest_.name = name;
  BlocklyStorage.httpRequest_.onreadystatechange =
      BlocklyStorage.handleRequest_;
  BlocklyStorage.httpRequest_.open('POST', url);
  BlocklyStorage.httpRequest_.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
  BlocklyStorage.httpRequest_.send(name + '=' + encodeURIComponent(content)+ '&workspace=' + encodeURIComponent(workspace.name));
  BlocklyStorage.httpRequest_.workspace = workspace;
};

/**
 * Callback function for AJAX call.
 * @private
 */
BlocklyStorage.handleRequest_ = function() {
  if (BlocklyStorage.httpRequest_.readyState == 4) {
    if (BlocklyStorage.httpRequest_.status != 200) {
      BlocklyStorage.alert(BlocklyStorage.HTTPREQUEST_ERROR + '\n' +
          'httpRequest_.status: ' + BlocklyStorage.httpRequest_.status);
    } else {
      var data = BlocklyStorage.httpRequest_.responseText.trim();
      if (BlocklyStorage.httpRequest_.name == 'xml') {
        window.location.hash = data;
        BlocklyStorage.alert(BlocklyStorage.LINK_ALERT.replace('%1',
            window.location.href));
      } else if (BlocklyStorage.httpRequest_.name == 'key') {
        if (!data.length) {
          BlocklyStorage.alert(BlocklyStorage.HASH_ERROR.replace('%1',
              window.location.hash));
        } else {
          BlocklyStorage.loadXml_(data, BlocklyStorage.httpRequest_.workspace);
        }
      }
      BlocklyStorage.monitorChanges_(BlocklyStorage.httpRequest_.workspace);
    }
    BlocklyStorage.httpRequest_ = null;
  }
};

/**
 * Start monitoring the workspace.  If a change is made that changes the XML,
 * clear the key from the URL.  Stop monitoring the workspace once such a
 * change is detected.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.monitorChanges_ = function(workspace) {
  var startXmlDom = Blockly.Xml.workspaceToDom(workspace);
  var startXmlText = Blockly.Xml.domToText(startXmlDom);
  function change() {
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xmlDom);
    if (startXmlText != xmlText) {
      window.location.hash = '';
      workspace.removeChangeListener(change);
    }
  }
  workspace.addChangeListener(change);
};

/**
 * Load blocks from XML.
 * @param {string} xml Text representation of XML.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyStorage.loadXml_ = function(xml, workspace) {
  try {
    xml = Blockly.Xml.textToDom(xml);
  } catch (e) {
    BlocklyStorage.alert(BlocklyStorage.XML_ERROR + '\nXML: ' + xml);
    return;
  }
  // Clear the workspace to avoid merge.
  workspace.clear();
  Blockly.Xml.domToWorkspace(xml, workspace);
};

/**
 * Present a text message to the user.
 * Designed to be overridden if an app has custom dialogs, or a butter bar.
 * @param {string} message Text to alert.
 */
BlocklyStorage.alert = function(message) {
  window.alert(message);
};

const toolbox = {
 "kind": "flyoutToolbox",
 "contents": [ 
  {
    "kind": "block",
    "type": "node"
  },
  {
    "kind": "block",
    "type": "token"
  },

 ]
};
    




// hardcoded till the end

var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	disable : false, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
  zoom: {
    controls: true,
  },
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true
};

function codeGeneration(event) {
  if (Blockly.JSON)
  {  
      try {
          var code = Blockly.JSON.workspaceToCode(workspace);
	  } catch (e) {
		console.warn("Error while creating code", e);
		code = "Error while creating code:" + e
	  }     
    //  document.getElementById('codeDiv').value = code;
  }
}

function createRascal(event)
{
  var code = Rascal.workspaceToRascal(workspace);
  document.getElementById('codeDiv').value = code;

}

function updateDropdownRename(event)
{
	if (event.type == "change" && (event.name=="NAME" || event.name=="FIELDNAME" ) || event.type == "create")
	{
    var blocks = workspace.getAllBlocks(); 
    for (var k = 0; k < blocks.length; k++) {
      var block = blocks[k];
 
      for (var i = 0, input; (input = block.inputList[i]); i++) {
        for (var j = 0, field; (field = input.fieldRow[j]); j++) {
          if (field.getOptions) // is dropdown
          {
           // during name update of a block  
           // stay to have the same value (block id)
           // but need to rerender the text
           // get and setValue are needed (probably some side effect)
           var value = field.getValue();
           var field_options = field.getOptions();
           field.setValue(value)     
           field.forceRerender()
          }
        }
      }
   }
  }
}

var workspace;
var workspace_match;
var workspace_replaced;

function vscode_start()
{
  inject();

  search();

}

function search()
{
  workspace.workspaceSearch = new WorkspaceSearch(workspace);

  workspace.workspaceSearch.init();
  workspace.workspaceSearch.open();
}

function inject()
{
  /* Inject your workspace */ 
  workspace = Blockly.inject("blocklyDiv", options);
  workspace.name="Concrete"
  options.toolbox = {
    "kind": "categoryToolbox",
    "contents": [
     {
      "kind": "category",
      "name" : "Node",
      "colour": "#3c0",
      "contents": [
       {
         "kind": "block",
         "type": "node"
       },
       {
         "kind": "block",
         "type": "token"
       },
      ]
     },
     {
      "kind": "category",
      "name" : "Match",
      "colour": "#339",
      "contents": [
       {
         "kind": "block",
         "type": "match_replace"
       },
       {
         "kind": "block",
         "type": "match_tree"
       },
       {
         "kind": "block",
         "type": "match_variable"
       },
      ]
     },
     {
      "kind": "category",
      "name" : "Library",
      "colour": "#f63",
      "contents": [
        {
          "kind": "block",
          "type": "controls_for"
        }
      ]
     },
     {
      "kind": "category",
      "name": "Variables",
      "custom": "VARIABLE"
     },
     {
      "kind":"category",
      "name":"Logic",
      "categorystyle":"logic_category",
      "contents":[
        {
          "kind":"category",
          "name":"If",
          "contents":[
            {
              "kind":"block",
              "type":"controls_if"
            },
            {
              "kind":"block",
              "type":"controls_if",
              "extraState":{
                "hasElse":"true"
              }
            },
            {
              "kind":"block",
              "type":"controls_if",
              "extraState":{
                "hasElse":"true",
                "elseIfCount":1
              }
            }
          ]
        },
        {
          "kind":"category",
          "name":"Boolean",
          "categorystyle":"logic_category",
          "contents":[
            {
              "kind":"block",
              "type":"logic_compare"
            },
            {
              "kind":"block",
              "type":"logic_operation"
            },
            {
              "kind":"block",
              "type":"logic_negate"
            },
            {
              "kind":"block",
              "type":"logic_boolean"
            },
            {
              "kind":"block",
              "type":"logic_null"
            },
            {
              "kind":"block",
              "type":"logic_ternary"
            }
          ]
        }
      ]
    },
    {
      "kind":"category",
      "name":"Loops",
      "categorystyle":"loop_category",
      "contents":[
        {
          "kind":"block",
          "type":"controls_repeat_ext",
          "inputs":{
            "TIMES":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":10
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"controls_whileUntil"
        },
        {
          "kind":"block",
          "type":"controls_for",
          "fields":{
            "VAR":"i"
          },
          "inputs":{
            "FROM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "TO":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":10
                }
              }
            },
            "BY":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"controls_forEach"
        },
        {
          "kind":"block",
          "type":"controls_flow_statements"
        }
      ]
    },
    {
      "kind":"category",
      "name":"Math",
      "categorystyle":"math_category",
      "contents":[
        {
          "kind":"block",
          "type":"math_number",
          "fields":{
            "NUM":123
          }
        },
        {
          "kind":"block",
          "type":"math_arithmetic",
          "fields":{
            "OP":"ADD"
          }
        },
        {
          "kind":"block",
          "type":"math_single",
          "fields":{
            "OP":"ROOT"
          }
        },
        {
          "kind":"block",
          "type":"math_trig",
          "fields":{
            "OP":"SIN"
          }
        },
        {
          "kind":"block",
          "type":"math_constant",
          "fields":{
            "CONSTANT":"PI"
          }
        },
        {
          "kind":"block",
          "type":"math_number_property",
          "extraState":"<mutation divisor_input=\"false\"></mutation>",
          "fields":{
            "PROPERTY":"EVEN"
          }
        },
        {
          "kind":"block",
          "type":"math_round",
          "fields":{
            "OP":"ROUND"
          }
        },
        {
          "kind":"block",
          "type":"math_on_list",
          "extraState":"<mutation op=\"SUM\"></mutation>",
          "fields":{
            "OP":"SUM"
          }
        },
        {
          "kind":"block",
          "type":"math_modulo"
        },
        {
          "kind":"block",
          "type":"math_constrain",
          "inputs":{
            "LOW":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "HIGH":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":100
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"math_random_int",
          "inputs":{
            "FROM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":1
                }
              }
            },
            "TO":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":100
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"math_random_float"
        },
        {
          "kind":"block",
          "type":"math_atan2"
        }
      ]
    },
    {
      "kind":"category",
      "name":"Lists",
      "categorystyle":"list_category",
      "contents":[
        {
          "kind":"block",
          "type":"lists_create_empty"
        },
        {
          "kind":"block",
          "type":"lists_create_with",
          "extraState":{
            "itemCount":3
          }
        },
        {
          "kind":"block",
          "type":"lists_repeat",
          "inputs":{
            "NUM":{
              "block":{
                "type":"math_number",
                "fields":{
                  "NUM":5
                }
              }
            }
          }
        },
        {
          "kind":"block",
          "type":"lists_length"
        },
        {
          "kind":"block",
          "type":"lists_isEmpty"
        },
        {
          "kind":"block",
          "type":"lists_indexOf",
          "fields":{
            "END":"FIRST"
          }
        },
        {
          "kind":"block",
          "type":"lists_getIndex",
          "fields":{
            "MODE":"GET",
            "WHERE":"FROM_START"
          }
        },
        {
          "kind":"block",
          "type":"lists_setIndex",
          "fields":{
            "MODE":"SET",
            "WHERE":"FROM_START"
          }
        }
      ]
    },
    {
      "kind":"sep"
    },
    {
      "kind":"category",
      "name":"Variables",
      "categorystyle":"variable_category",
      "custom":"VARIABLE"
    },
    {
      "kind":"category",
      "name":"Functions",
      "categorystyle":"procedure_category",
      "custom":"PROCEDURE"
    },
    {
      "kind":"category",
      "name":"Library",
      "expanded":"true",
      "contents":[
        {
          "kind":"category",
          "name":"Randomize",
          "contents":[
            {
              "kind":"block",
              "type":"procedures_defnoreturn",
              "extraState":{
                "params":[
                  {
                    "name":"list"
                  }
                ]
              },
              "icons":{
                "comment":{
                  "text":"Describe this function...",
                  "pinned":false,
                  "height":80,
                  "width":160
                }
              },
              "fields":{
                "NAME":"randomize"
              },
              "inputs":{
                "STACK":{
                  "block":{
                    "type":"controls_for",
                    "fields":{
                      "VAR":{
                        "name":"x"
                      }
                    },
                    "inputs":{
                      "FROM":{
                        "block":{
                          "type":"math_number",
                          "fields":{
                            "NUM":1
                          }
                        }
                      },
                      "TO":{
                        "block":{
                          "type":"lists_length",
                          "inline":false,
                          "inputs":{
                            "VALUE":{
                              "block":{
                                "type":"variables_get",
                                "fields":{
                                  "VAR":{
                                    "name":"list"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "BY":{
                        "block":{
                          "type":"math_number",
                          "fields":{
                            "NUM":1
                          }
                        }
                      },
                      "DO":{
                        "block":{
                          "type":"variables_set",
                          "inline":false,
                          "fields":{
                            "VAR":{
                              "name":"y"
                            }
                          },
                          "inputs":{
                            "VALUE":{
                              "block":{
                                "type":"math_random_int",
                                "inputs":{
                                  "FROM":{
                                    "block":{
                                      "type":"math_number",
                                      "fields":{
                                        "NUM":1
                                      }
                                    }
                                  },
                                  "TO":{
                                    "block":{
                                      "type":"lists_length",
                                      "inline":false,
                                      "inputs":{
                                        "VALUE":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"list"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "next":{
                            "block":{
                              "type":"variables_set",
                              "inline":false,
                              "fields":{
                                "VAR":{
                                  "name":"temp"
                                }
                              },
                              "inputs":{
                                "VALUE":{
                                  "block":{
                                    "type":"lists_getIndex",
                                    "fields":{
                                      "MODE":"GET",
                                      "WHERE":"FROM_START"
                                    },
                                    "inputs":{
                                      "VALUE":{
                                        "block":{
                                          "type":"variables_get",
                                          "fields":{
                                            "VAR":{
                                              "name":"list"
                                            }
                                          }
                                        }
                                      },
                                      "AT":{
                                        "block":{
                                          "type":"variables_get",
                                          "fields":{
                                            "VAR":{
                                              "name":"y"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "next":{
                                "block":{
                                  "type":"lists_setIndex",
                                  "inline":false,
                                  "fields":{
                                    "MODE":"SET",
                                    "WHERE":"FROM_START"
                                  },
                                  "inputs":{
                                    "LIST":{
                                      "block":{
                                        "type":"variables_get",
                                        "fields":{
                                          "VAR":{
                                            "name":"list"
                                          }
                                        }
                                      }
                                    },
                                    "AT":{
                                      "block":{
                                        "type":"variables_get",
                                        "fields":{
                                          "VAR":{
                                            "name":"y"
                                          }
                                        }
                                      }
                                    },
                                    "TO":{
                                      "block":{
                                        "type":"lists_getIndex",
                                        "fields":{
                                          "MODE":"GET",
                                          "WHERE":"FROM_START"
                                        },
                                        "inputs":{
                                          "VALUE":{
                                            "block":{
                                              "type":"variables_get",
                                              "fields":{
                                                "VAR":{
                                                  "name":"list"
                                                }
                                              }
                                            }
                                          },
                                          "AT":{
                                            "block":{
                                              "type":"variables_get",
                                              "fields":{
                                                "VAR":{
                                                  "name":"x"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "next":{
                                    "block":{
                                      "type":"lists_setIndex",
                                      "inline":false,
                                      "fields":{
                                        "MODE":"SET",
                                        "WHERE":"FROM_START"
                                      },
                                      "inputs":{
                                        "LIST":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"list"
                                              }
                                            }
                                          }
                                        },
                                        "AT":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"x"
                                              }
                                            }
                                          }
                                        },
                                        "TO":{
                                          "block":{
                                            "type":"variables_get",
                                            "fields":{
                                              "VAR":{
                                                "name":"temp"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        {
          "kind":"category",
          "name":"Jabberwocky",
          "contents":[
            {
              "kind":"block",
              "type":"text_print",
              "inputs":{
                "TEXT":{
                  "block":{
                    "type":"text",
                    "fields":{
                      "TEXT":"'Twas brillig, and the slithy toves"
                    }
                  }
                }
              },
              "next":{
                "block":{
                  "type":"text_print",
                  "inputs":{
                    "TEXT":{
                      "block":{
                        "type":"text",
                        "fields":{
                          "TEXT":"  Did gyre and gimble in the wabe:"
                        }
                      }
                    }
                  },
                  "next":{
                    "block":{
                      "type":"text_print",
                      "inputs":{
                        "TEXT":{
                          "block":{
                            "type":"text",
                            "fields":{
                              "TEXT":"All mimsy were the borogroves,"
                            }
                          }
                        }
                      },
                      "next":{
                        "block":{
                          "type":"text_print",
                          "inputs":{
                            "TEXT":{
                              "block":{
                                "type":"text",
                                "fields":{
                                  "TEXT":"  And the mome raths outgrabe."
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              "kind":"block",
              "type":"text_print",
              "inputs":{
                "TEXT":{
                  "block":{
                    "type":"text",
                    "fields":{
                      "TEXT":"\"Beware the Jabberwock, my son!"
                    }
                  }
                }
              },
              "next":{
                "block":{
                  "type":"text_print",
                  "inputs":{
                    "TEXT":{
                      "block":{
                        "type":"text",
                        "fields":{
                          "TEXT":"  The jaws that bite, the claws that catch!"
                        }
                      }
                    }
                  },
                  "next":{
                    "block":{
                      "type":"text_print",
                      "inputs":{
                        "TEXT":{
                          "block":{
                            "type":"text",
                            "fields":{
                              "TEXT":"Beware the Jubjub bird, and shun"
                            }
                          }
                        }
                      },
                      "next":{
                        "block":{
                          "type":"text_print",
                          "inputs":{
                            "TEXT":{
                              "block":{
                                "type":"text",
                                "fields":{
                                  "TEXT":"  The frumious Bandersnatch!\""
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      ]
    },
     
     {
      "kind": "category",
      "name" : "Basic",
      "colour": "#63f",
      "contents": [
       {
         "kind": "block",
         "type": "basic_dict"
       },
       {
         "kind": "block",
         "type": "basic_key_dict"
       },
       {
         "kind": "block",
         "type": "basic_key_list"
       },
       {
         "kind": "block",
         "type": "basic_key_value"
       },
       {
         "kind": "block",
         "type": "basic_list"
       },
       {
         "kind": "block",
         "type": "basic_list_value"
       },
      ]
     },
   
    ]
   }
  workspace_match = Blockly.inject("blocklyMatch", options);
  workspace_match.name="Match"
  options.toolbox = null
  workspace_replaced = Blockly.inject("blocklyReplaced", options);
  workspace_replaced.name="replaced"
}

function match_listener(event)
{
  // copy all the blocks from left (input) to right (output)
  var workspace_blocks_json = Blockly.serialization.workspaces.save(workspace)
  workspace_replaced.clear()
  Blockly.serialization.workspaces.load(workspace_blocks_json, workspace_replaced)

  // walk the match_replace blocks to replace the blocks in workspace_replaced
  var top_blocks = workspace_match.getTopBlocks();
  var code = '';
  for(var j=0;j<top_blocks.length;j++)  
  {
    var top_block = top_blocks[j];
    while (top_block)
    {
      if (top_block.type == "match_replace")
      {
        code += Match.match_replace_top(top_block.getInputTargetBlock("MATCH"), 
                                        top_block.getInputTargetBlock("REPLACE"), 
                                        workspace_blocks_json)
      }
      top_block = top_block.getNextBlock();
    }
  }
  document.getElementById('codeDiv').value = code;
  
  // load the adjusted workspace_blocks_json into the workspace again
  Blockly.serialization.workspaces.load(workspace_blocks_json, workspace_replaced);
}

function modifyMatchBlocks(event)
{
  if (event.type == "create")
  {
    var block = workspace_match.getBlockById(event.blockId);
    
    // add top and bottom connectors to the new block
    // should be part of the creation of a block
    // previous and next can only be changed in the init or loadState
    // as a InsertMarker blocks are created with previous and next set to null
    //block.setPreviousStatement(true, null);
    //block.setNextStatement(true, null);

    // loop over the inputs
    for (var i=0;block && i<block.inputList.length;i++)
    {
      // loop over the fields of an input
      for (var j=0;j<block.inputList[i].fieldRow.length;j++)
      {
        // if the field is a dropdown
        var field = block.inputList[i].fieldRow[j] 
        
        // remove the validators 
        field.doClassValidation_ = function(value) { return value; };
        
        // FieldLabel
        if (field.constructor.name.startsWith("FieldLabel") || 
            field.constructor.name.startsWith("FieldDropdown"))
        {
          // Remove this field from the input
          block.inputList[i].removeField(field.name);
          
          // replace the dropdown with a text field
          var text_field = new Blockly.FieldTextInput(field.getText());
          block.inputList[i].appendField(text_field, field.name);
        }
      }
    }
  }
}

export function start1()
{
  inject();

  BlocklyStorage.restoreBlocks(workspace, 'concrete');
  BlocklyStorage.backupOnUnload(workspace, 'concrete');

  BlocklyStorage.restoreBlocks(workspace_match, 'match');
  BlocklyStorage.backupOnUnload(workspace_match, 'match');
  BlocklyStorage.restoreBlocks(workspace_replaced, 'replaced');
  BlocklyStorage.backupOnUnload(workspace_replaced, 'replaced');

  //workspace.addChangeListener(codeGeneration);
  workspace.addChangeListener(updateDropdownRename);
  workspace.addChangeListener(createRascal);
  workspace_match.addChangeListener(modifyMatchBlocks);
  workspace.addChangeListener(match_listener);
  workspace_match.addChangeListener(match_listener);


  search();
  document.getElementById("save").addEventListener("click", saveFile);
  add_load()
  add_match_load();
  useDoubleClick_(true);


  const options = {
    contextMenu: true,
    shortcut: true,
  }
  
  // Initialize plugin.
  const plugin = new CrossTabCopyPaste();
  plugin.init(options);
}


function get_json(workspace)
{
  var json_text = Blockly.serialization.workspaces.save(workspace);
  var data = JSON.stringify(json_text, undefined, 2);
  return data
}

function download(name, url) {
  const a = document.createElement('a')
  a.href = url
  
  a.download = name;
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function saveFile()
{
    var data = get_json(workspace_match)
    var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    download('match.json', url)
};

function add_load()
{
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    for (let i = 0; i < this.files.length; i++) {
		var file = this.files[i];
		if (file) {
		  var reader = new FileReader();
		  reader.readAsText(file, "UTF-8");
		  reader.onload = function (evt) {
			var json = JSON.parse(evt.target.result);
			Blockly.serialization.workspaces.load(json, workspace)
		  }
		  reader.onerror = function (evt) {
			document.getElementById("error").innerHTML = "error reading file";
		  }
		}
    }
  }
}

function add_match_load()
{
  const inputElement = document.getElementById("input_match");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    for (let i = 0; i < this.files.length; i++) {
		var file = this.files[i];
		if (file) {
		  var reader = new FileReader();
		  reader.readAsText(file, "UTF-8");
		  reader.onload = function (evt) {
			var json = JSON.parse(evt.target.result);
			Blockly.serialization.workspaces.load(json, workspace_match)
		  }
		  reader.onerror = function (evt) {
			document.getElementById("error").innerHTML = "error reading file";
		  }
		}
    }
  }
}

var origHandleWsStart_ = Blockly.Gesture.prototype.handleWsStart;

/**
   * Add double click to expand/collapse blocks (MIT App Inventor Supported).
   * @param {!boolean} on Whether to turn on the mode.
   * @private
   */
function useDoubleClick_(on) {
  if (!on) {
    Blockly.Gesture.prototype.handleWsStart = origHandleWsStart_;
    return;
  }

  Blockly.Gesture.prototype.handleWsStart = (function(func) {
    if (func.isWrapped) {
      return func;
    }

    const wrappedFunc = function(e, ws) {
      func.call(this, e, ws);
      if (this.targetBlock_ && e.buttons === 1 ) {
        const preCondition = function(block) {
          return !block.isInFlyout && block.isMovable() &&
          block.workspace.options.collapse;
        };
        if (Blockly.getSelected() && preCondition(Blockly.getSelected())) {
          if (ws.doubleClickPid_) {
            clearTimeout(ws.doubleClickPid_);
            ws.doubleClickPid_ = undefined;
            if (Blockly.getSelected().id === ws.doubleClickBlock_) {
              const state = !Blockly.getSelected().isCollapsed();
              const maybeCollapse = function(block) {
                if (block) {
                  block.setCollapsed(state);
                }
              };
              Blockly.Events.setGroup(true);
              if (Blockly.getSelected()) {
                maybeCollapse(Blockly.getSelected());
              }
              Blockly.Events.setGroup(false);
              return;
            }
          }
          if (!ws.doubleClickPid_) {
            ws.doubleClickBlock_ = Blockly.getSelected().id;
            ws.doubleClickPid_ = setTimeout(function() {
              ws.doubleClickPid_ = undefined;
            }, 500);
          }
        }
      }
    };
    wrappedFunc.isWrapped = true;
    return wrappedFunc;
  })(Blockly.Gesture.prototype.handleWsStart);
}


class BlockData {
  constructor(block_type, fields, children) {
    this.block_type = block_type;
    this.fields = fields;
    this.children = children;
  }
}

// please make a instance of the Javascript Block class from a Blockly block instance
function makeBlock(block) {
  var block_type = block.type;
  var fields = {};
  for (var i = 0; i < block.inputList.length; i++) {
    var input = block.inputList[i];
    for (var j = 0; j < input.fieldRow.length; j++) {
      var field = input.fieldRow[j];
      if (field.name) {
        fields[field.name] = field.getValue();
      }
    }
  }
  var children = []; 
 
  var blockly_children = block.getChildren()
  // remove the next block, only inside
  var blockly_children_without_next = blockly_children.filter(ch => ch!=block.getNextBlock());
  
  var next = '1'
  for (var j =0;j<blockly_children_without_next.length;j++){
    children.push(makeBlock(blockly_children_without_next[j]))
    next = blockly_children_without_next[j].getNextBlock()
    while(next) {
    
      children.push(makeBlock(next));
      next = next.getNextBlock()
    }
  }
  


  
  return new BlockData(block_type, fields, children);
}

