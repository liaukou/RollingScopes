class CustomJquery {
    constructor(selector) {
        if (typeof selector === 'string') {
            this.elements = Array.from(document.querySelectorAll(selector));
        }
        else {
            this.elements = Array.from(selector);
        }
    }

    addClass(value) {
        if (typeof value === 'function') {
            this.elements.map( (v,i) => {
                let classes = v.getAttribute('class');
                let newClasses = classes + ' ' + value.call(this, i, classes);
                v.setAttribute('class', newClasses);
            });
        }
        else if (typeof value === 'string') {
            this.elements.map( (v) => {
                value = v.getAttribute('class') + ' ' + value;
                v.setAttribute('class', value );
            });
        }
        return this;
    }

    append(value) {
        if (typeof value === 'string') {
            this.elements.map( (v) => {
                v.innerHTML = value;
            });
        }
        if (typeof value === 'object') {
            if (value instanceof CustomJquery) {
                this.elements.map( (v) => {
                     value.elements.map( (val) => {
                         v.innerHTML += val.outerHTML;
                     });
                });
            }
            else {
                this.elements.map( (v) => {
                    v.innerHTML = value.outerHTML;
                });
            }
        }
        return this;
    }

    html(value) {
        if (!value) {
            let result = '';
            this.elements.map( (v) => {
                result += v.innerHTML;
            });
            return result;
        }
        else if (typeof value === 'string') {
            this.elements.map( (v) => {
                v.innerHTML = value;
                return this;
            });
        }
        return this;
    }

    attr(attr, value) {
        if (!value) {
            return this.elements[0].getAttribute(attr);
        }
        else {
            this.elements.map( (v) => {
                v.setAttribute(attr, value);
            });
            return this;
        }
    }

    children(value) {
        if (!value) {
            return this.elements[0].children;
        }
        else if (typeof value === 'string') {
            let res = [];
            this.elements.map( (v) => {
                Array.from(v.children).map( (v) => {
                    if (v.matches(value)) {
                        res.push(v);
                    }
                });
            });
            return res;
        }
    }

    css(value) {
        if (typeof value === 'string') {
            return this.elements[0].style[value];
        }
        if (typeof value === 'object') {
            this.elements.map( (v) => {
                for (let item in value) {
                    v.style[item] = value[item];
                }
            });
            return this;
        }
    }

    data(key, value) {
        if (!key) {
            let res = [];
            this.elements.map( (v) => {
                if (v.dataset) {
                    res.push(v.dataset);
                }
            });
            return res[0];
        }
        if (typeof key === 'string' && !value) {
            let res = [];
            this.elements.map( (v) => {
                if (v.dataset[key]) {
                    res.push(v.dataset[key]);
                }
            });
            return res[0];
        }
        if (typeof key === 'object') {
            this.elements.map( (v) => {
                for (let item in key) {
                    v.dataset[item] = key[item];
                }
            });
            return this;
        }
        else {
            this.elements.map( (v) => {
                v.dataset[key] = value;
            });
            return this;
        }
    }

    on(type, listener) {
        if (typeof listener === 'function') {
            this.elements.map( (v) => {
                v.addEventListener(type, listener);
            });
        }
        else {
            this.elements.map( (v) => {
                 v.addEventListener(type, (e) => {
                     if (e.target.matches(listener)) {
                         arguments[2].call(this);
                     }
                 });
            });
        }
        return this;
    }

    one(type, listener) {
        this.elements.map( (v) => {
             v.addEventListener(type, function once() {
                 listener.call(this);
                 v.removeEventListener(type, once);
             });
        });
        return this;
    }

    each(fun) {
        let res;
        this.elements.every( (v,i) => {
            res = fun.call(v, i, v);
            if (res === false) {
                return false;
            } else {
                return true;
            }
        });
        return this;
    }
}

const $ = function (selector) {
    return new CustomJquery(selector);
};

window.$ = $;
