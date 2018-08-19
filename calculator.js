/*design & code by riversword*/

$(document).ready(function () {
	var inputStr = "", // 输入框的内容
		result = "",  // 运算结果
		Ans = "",
		inputLimit = false,
		inputMaxL = 60, // 输入框能容纳的最大字符数
		resultMaxL = 10, // 结果框能容纳的最大字符数
		hasACclick = false,
	 	buttons = $('table td');
	
	buttons.click(function () {

		if ($(this).html() != '=' && $(this).html() != 'AC' && $(this).html() !='AE' && $(this).html() != 'Ans') {
			//屏幕中字符串超限制时，不响应
			if (inputLimit) {
				//do nothing
			} else {
				if (inputStr.length >= inputMaxL) {
					inputStr += '...';
					inputLimit = true;
				} else {
					inputStr += $(this).html();
				}
				hasACclick = false;
			}
			showInput();
		} else if ($(this).html() == 'Ans') {
			if (inputLimit){
				// do nothing
			} else {
				if (inputStr.length+Ans.toString().length >= inputMaxL) {
					inputStr += Ans;
					inputStr = inputStr.slice(0, inputMaxL); // 获取前60个字符
					inputStr += '...';
					inputLimit = true;
				}else{
					inputStr += Ans;
				}
			}
			showInput();
			hasACclick = false;
		} else {
			switch ($(this).html()) {
				case '=':
				if (!inputLimit) {
					// 先判断inputStr是否为有效字符串：无连续运算符、结尾不是运算符.运算符号需要转义
					if (/^[\*\/\.]/g.test(inputStr) || /[\+\-\*\/\.]$/g.test(inputStr) || /[\+\-\*\/\.][\+\-\*\/\.]/g.test(inputStr)) {
						// 若是运算符开头，则显示错误
						$('#result p:eq(1)').html('error!');
						$('#result p:eq(1)').css('color','red');
					} else {
						$('#result p:eq(1)').css('color','white');
						result = eval(inputStr);
						Ans = result;
						$('#result p:eq(0)').html('Ans='+result);
						if (result.toString().length >= 10) {
							$('#result p:eq(1)').html(result.toString().slice(0, resultMaxL) + '...');
						} else {
							$('#result p:eq(1)').html(result);
						}
					}
					
				}
				break;

				case 'AC':
				inputStr = '';
				$('#result p:eq(1)').html('');
				inputLimit = false;
				showInput();
				if (hasACclick) {
					// 双击"AC"清除屏幕上的"Ans"
					Ans = '';
					$('#result p:eq(0)').html('');
				}
				hasACclick = true;
				break;

				case 'AE':
				if (inputLimit) {
					var num = inputStr.length-4;
					inputStr = inputStr.substring(0, num);
					inputLimit = false;
				} else {
					inputStr = inputStr.slice(0, inputStr.length-1);
				}
				showInput();
				break;
			}
		}
			
	});

	function showInput(){
		$('#inputContent p').html(inputStr);
	}
});