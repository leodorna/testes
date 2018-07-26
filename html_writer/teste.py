import ply.lex as lex

tokens = (
    'IDENTIFIER',
    'APPEND_TK',
    'ATTR_TK'
)

t_IDENTIFIER = r'[a-zA-Z][a-zA-Z0-9_\-]*'
t_ATTR_TK = r'='
t_APPEND_TK = r'<='

t_ignore = " \t"

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print("Illegal character '%s'" % t.value[0])
    t.lexer.skip(1)

lexer = lex.lex()

data = '''
   teste = ronaldo
   teste <= ronaldo 
'''
# Give the lexer some input
lexer.input(data)


"""
while True:
    tok = lexer.token()
    if not tok: 
        break      # No more input
    print(tok)
"""