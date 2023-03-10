# blockly-visitor
Block-based vistor pattern, so matching and replacing in a block-ast tree

# [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

This how to match blocks inspired by:
[https://docs.rascal-mpl.org/unstable/Rascal/#Patterns-Concrete](https://www.rascal-mpl.org/docs/Rascal/Patterns/Concrete/)


## Installation

```
npm install
```

## Running

```
npm run start
```

Download [ast.json](https://block-based-editors.github.io/blockly-visitor/ast.json) and load on the left workspace.
Also download [match_basic.json](https://block-based-editors.github.io/blockly-visitor/match_basic.json) and load that in the middle.
All the matched blocks are replaced by the replace blocks. 

![image](https://user-images.githubusercontent.com/8227977/224411705-b041ae43-4207-4d11-b28d-f0fde5ae5e75.png)
