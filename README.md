# react-confirm-dialog
step1: download file js and css to your project
step2: include css file
step2: call ConfirmDialog from js file
exam: 
```javascript
import ConfirmDialog from '../../ConfirmDialog';
 ConfirmDialog({
                title: "This menu is disabled",
                subtitle: "Bạn cần chọn dự án để làm việc!",
                onOk: function(){alert('clicked OK')},
                onCancel: function(){alert('clicked Cancel')},
                okText: "What's this?",
                cancelText: "Ok",
            });
            ```
