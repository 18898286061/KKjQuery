class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.text = text
        this.children = children
    }

    render() {
        if(this.tag === '#text') {
            return document.createTextNode(this.text)
        }
        let el = document.createElement(this.tag)
        this.children.forEach(vChild => {
            el.appendChild(vChild.render())
        })
        return el
    }
}

function v(tag, children, text) {
    if(typeof children === 'string') {
        text = children
        children = []
    }
    return new VNode(tag, children, text)
}
/* 

let vNode1 = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
        ]
    ),
    v('span', [
        v('#text', 'jirengu.com')
    ])
])

const root = document.querySelector('#root')
root.appendChild(vNode1.render())

let vNode2 = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
        ]
    ),
    v('span', [
        v('#text', 'jirengu.com')
    ]),
    v('span', [
        v('#text', 'KaiKai')
    ])
])

document.querySelector('#btn').onclick = function() {
    root.innerHTML = ''
    root.appendChild(vNode2.render())
}

 */





function patchElement(parent, newVNode, oldVNode, index = 0) {
    if(!oldVNode) {
        parent.appendChild(newVNode.render())
    } else if(!newVNode) {
        parent.removeChild(parent.ChildNodes[index])
    } else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
        parent.replaceChild(newVNode.render(), parent.ChildNodes[index])
    } else {
        for(let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
            patchElement(parent.ChildNodes[index], newVNode.children[i], oldVNode.children[i], i)
        }
    }
}

/* 
let vNodes1 = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
        ]
    ),
    v('span', [
        v('#text', 'jirengu.com')
    ])
])

let vNodes2 = v('div', [
    v('p', [
        v('span', [v('#text', 'xiedaimala.com')])
        ]
    ),
    v('span', [
        v('#text', 'jirengu.com')
    ]),
    v('span', [
        v('#text', 'KaiKai')
    ])
])
*/
let vNode1 = v('div', [v('#text', 'Hello')])
let vNode2 = v('div', [v('#text', 'World')])

const root = document.querySelector('#root')
patchElement(root, vNode1)
patchElement(root, vNode2, vNode1)