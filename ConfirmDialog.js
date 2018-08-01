/**
 * Created by ngankt2@gmail.com on 6/4/2017.
 * website: https://techhandle.net
 */


function ce(tag, clas, txt) {
    var ele = document.createElement(tag);
    ele.setAttribute('class', clas);
    if (typeof txt === 'undefined' || txt === null) {
        return ele;
    }
    var tn = document.createTextNode(txt);
    ele.appendChild(tn);
    return ele;
}
let KEY_ESC = 27;

var _DialogConfirm = function (title, sub, onOk, onCancel) {
    var prev = document.getElementsByClassName('_dialog-confirm');
    if (prev.length > 0) {
        document.body.removeChild(prev[0]);
    }

    var options = {
        title: 'Confirm',
        subtitle: '',
        onOk: null,
        onCancel: null,
        okText: 'OK',
        cancelText: 'Cancel'
    };

    if (typeof title === 'object') {
        for (var key in title) {
            options[key] = title[key];
        }
    } else {
        options.title = (typeof title === 'string') ? title : options.title;
        options.subtitle = (typeof sub === 'string') ? sub : options.subtitle;
        options.onOk = (typeof onOk === 'function') ? onOk : options.onOk;
        options.onCancel = (typeof onCancel === 'function') ? onCancel : options.onCancel;

        if (typeof sub === 'function') {
            options.onOk = sub;
        }
    }

    var dialog = ce('div', '_dialog-confirm'),
        overlay = ce('div', '_dialog-overlay'),
        closeBtn = ce('button', '_dialog-close');
    closeBtn.innerHTML = '&times;';
    overlay.appendChild(closeBtn);

    closeBtn.addEventListener('click', destroy);

    var content = ce('div', '_dialog-content'),
        cTitle = ce('h3', '_dialog-title', options.title),
        body = ce('div', '_dialog-body', options.subtitle),
        action = ce('div', '_dialog-action'),
        okBtn = ce('button', '_dialog-ok', options.okText),
        cancelbtn = ce('button', '_dialog-cancel', options.cancelText);

    action.appendChild(okBtn);
    action.appendChild(cancelbtn);

    okBtn.addEventListener('click', ok);
    cancelbtn.addEventListener('click', cancel);

    content.appendChild(cTitle);
    content.appendChild(body);
    content.appendChild(action);

    dialog.appendChild(overlay);
    dialog.appendChild(content);
    document.body.appendChild(dialog);
    dialog.style.display = 'block';
    content.classList.add('_dialog-confirm--animate');
    cancelbtn.focus();

    document.addEventListener('keyup', _hide);

    function destroy() {
        closeBtn.removeEventListener('click', destroy);
        okBtn.removeEventListener('click', ok);
        cancelbtn.removeEventListener('click', cancel);
        document.removeEventListener('keyup', _hide);
        document.body.removeChild(dialog);
    }

    function ok() {
        destroy();
        if (options.onOk !== null) {
            options.onOk();
        }
    }

    function cancel() {
        destroy();
        if (options.onCancel !== null) {
            options.onCancel();
        }
    }

    function _hide(e) {
        if (e.keyCode == 27) {
            destroy();
        }
    }
};


module.exports = _DialogConfirm
