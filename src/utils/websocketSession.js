const ST_INITED = 0;
const ST_CLOSED = 1;

class WebsocketSession extends EventTarget {
    constructor(websocket) {
        super();
        this.websocket = websocket;
        this.requestIndex = 1;
        this.pendingRequest = {};
        this.listeners = {};
        this._initEvents();
    }

    on(type, callback) {
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}

	emit(type) {
		if(!(type in this.listeners)) return;
		const stack = this.listeners[type];
		Array.prototype.shift.apply(arguments);
		for(let i = 0, l = stack.length; i < l; i++) {
			stack[i](...arguments);
		}
	}

    _initEvents() {
        this.websocket.onopen = () => {
            this.state = ST_INITED;
            this.emit('open');
        };
        this.websocket.onerror = error => {
            this.state = ST_CLOSED;
            this.emit('error', error);
        };
        this.websocket.close = error => {
            this.state = ST_CLOSED;
            this.emit('close', error);
        };
        this.websocket.onmessage = msg => {
            const message = JSON.parse(msg.data);
            console.log(message);
			if (message.type === 'response') {
                if (message.requestId && this.pendingRequest[message.requestId]) {
                    if (message.code == 0) {
                        this.pendingRequest[message.requestId]._resolve(message.data);
                    } else {
                        this.pendingRequest[message.requestId]._reject(message.data);
                    }
                    delete this.pendingRequest[message.requestId];
                    return;
                }
            } else if (message.type === 'push') {
                this.emit('push', message);
            }
            
        }
    }

    send(msg) {
        if (this.state !== ST_INITED) return;
        if (typeof msg !== 'string') msg = JSON.stringify(msg);
        this.websocket.send(msg);
    }

    request(msg) {
        msg.requestId = ++this.requestIndex;
        const promise = new Promise((resolve, reject) => {
            this.pendingRequest[msg.requestId] = {
                _resolve: resolve,
                _reject: reject
            }
        });
        this.send(msg);
        return promise;
    }


}

module.exports = WebsocketSession;