var Validator = require('jsonschema').Validator;
var v = new Validator();

class ValidateMessage {
    constructor(msg){
        this.msg = msg;
    }

    buildMessage(){
        return utils.getMsgContent(this.msg);
    }
}

module.exports = ProcessMessage;