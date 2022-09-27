var trie = new Trie();

function createTree(){
    console.log("HHHH")
    var text = document.querySelector('.main_left textarea').value
    text = text.split('\n');
    for (let i=0; i<text.length; i++){
        text[i] = text[i].trim();
        trie.insert(text[i]);
    }
}

function findWords(){
    const prefix = document.querySelector('.main_right input').value;
    var words = trie.find(prefix);
    var list = document.querySelector('.main_right ul');
    list.innerHTML = "";
    for(var i = 0; i<Math.min(words.length, 8); i++){
        var li = document.createElement('li');
        li.className = "suggested_word";
        li.innerHTML = words[i];
        list.appendChild(li);
    }
}

function TrieNode(key){
    this.key = key;
    this.parent = null;
    this.children = {}
    this.isComplete = false;
    this.getWord = function(){
        var word = [];
        var currNode = this;
        while(currNode != null){
            word.push(currNode.key);
            currNode = currNode.parent;
        }
        word.reverse();
        return word.join('');
    }
}

function Trie(){
    this.root = new TrieNode(null);
    this.insert = function(word){
        var currNode = this.root;
        for(let i=0; i<word.length; i++){
            if (!currNode.children[word[i]]){
                currNode.children[word[i]] = new TrieNode(word[i]);
                currNode.children[word[i]].parent = currNode;
            }
            currNode = currNode.children[word[i]];
            if (i == word.length - 1){
                currNode.isComplete = true;
            }
        }
    }

    this.find = function(prefix){
        var currNode = this.root;
        var output = []
        for(let i=0; i<prefix.length; i++){
            if (currNode.children[prefix[i]]){
                currNode = currNode.children[prefix[i]];
            }
            else{
                return [];
            }
        }
        findAllWords(currNode, output);
        return output;
    }

    function findAllWords(node, arr){
        if (node.isComplete){
            arr.unshift(node.getWord());
        }
        for(var child in node.children){
            findAllWords(node.children[child], arr);
        }
    }
}