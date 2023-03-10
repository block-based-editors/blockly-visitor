"""
1. top_block_type should match
2. fields should match if specified, save variable if starts with $
3. children type should match (order does not matter)
4. children fields should match if specified, save variable if start with $
5. Children of children same applies
6. return the match and the saved variables
"""

def match_block(block, pattern):
    if block.block_type != pattern.block_type:
        return False, {}
    if pattern.fields is not None:
        for key, value in pattern.fields.items():
            if key not in block.fields:
                return False, {}
            if value.startswith('$'):
                return True, {value[1:]: block.fields[value]}
            if block.fields[key] != value:
                return False, {}
    if pattern.children is not None:
        if len(block.children) != len(pattern.children):
            return False, {}
        for child_pattern in pattern.children:
            found = False
            for child_block in block.children:
                match, variables = match_block(child_block, child_pattern)
                if match:
                    found = True
                    break
            if not found:
                return False, {}
    return True, {}

def match_blocks(blocks, patterns):
    for pattern in patterns:
        for block in blocks:
            match, variables = match_block(block, pattern)
            if match:
                return True, variables
    return False, {}
"""
Create different unittests for the code above
"""
import unittest
class Block(object):
  def __init__(self, block_type, fields, children):
     self.block_type = block_type
     self.fields = fields
     self.children = children

class TestMatchBlocks(unittest.TestCase):
    def test_match_block(self):
        block = Block('test', {'a': '1', 'b': '2'}, [])
        pattern = Block('test', {'a': '1', 'b': '2'}, [])
        self.assertEqual(match_block(block, pattern), (True, {}))

        block = Block('test', {'a': '1', 'b': '2'}, [])
        pattern = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [])])
        self.assertEqual(match_block(block, pattern), (False, {}))

        block = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [])])
        pattern = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [])])
        self.assertEqual(match_block(block, pattern), (True, {}))

        block = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [])])
        pattern = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [Block('test3', {'a': '1', 'b': '2'}, [])])])
        self.assertEqual(match_block(block, pattern), (False, {}))

        block = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [Block('test3', {'a': '1', 'b': '2'}, [])])])
        pattern = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [Block('test3', {'a': '1', 'b': '2'}, [])])])
        self.assertEqual(match_block(block, pattern), (True, {}))

        block = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [Block('test3', {'a': '1', 'b': '2'}, [])])])
        pattern = Block('test', {'a': '1', 'b': '2'}, [Block('test2', {'a': '1', 'b': '2'}, [Block('test3', {'a': '1', 'b': '2'}, [Block('test4', {'a': '1', 'b': '2'}, [])])])])
        self.assertEqual(match_block(block, pattern), (False, {}))

singletest = unittest.TestSuite()
singletest.addTest(TestMatchBlocks('test_match_block'))
unittest.TextTestRunner().run(singletest)
block = Block('typeA', {'fieldA': 'valueA'}, [])
pattern = Block('typeA', {'fieldA': 'valueA'}, [])
print(match_block(block, pattern))