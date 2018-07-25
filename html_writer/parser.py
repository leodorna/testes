import re

valid_name = "[a-zA-Z][a-zA-Z\_0-9\-]*"

identifier_re = re.compile(valid_name)
class_re = re.compile("\."+valid_name)
id_re = re.compile("#"+valid_name)

#def attr_sintax():
    
    
def read_file(name):
    file = open(name, "r")

    return file.readlines()

def create_line_object(line):
    line_object = {'left': '', 'right': ''}
    
    return line_object

#def create_st_entry(line_object):


#def parse():

def main():

if __name__ == "__main__":
    main()