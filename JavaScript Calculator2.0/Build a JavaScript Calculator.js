//用纯js来写呢？
$(document).ready(function(){
	var inputStr="",result="", Ans="",inputLimit=false,inputMaxL=60,resultMaxL=10,hasACclick=false;
	var buttons=$('table td');
	//console.log(buttons);
	//console.log(buttons.eq(9).html());
	buttons.click(function(){
		//console.log($(this).html());
		//console.log(typeof $(this).html()); string
		//每次点击前先判断，当前长度是否超限
			if($(this).html()!='='&& $(this).html()!='AC' && $(this).html()!='AE' && $(this).html()!='Ans'){
				//判断长度是否超过限值
				if(inputLimit){
					//do nothing
				}else{
					if(inputStr.length>=inputMaxL){//???
						inputStr+='...';
						inputLimit=true;
					}else{
						inputStr+=$(this).html();
					}
					hasACclick=false;
				}
				showInput();
			}else if($(this).html()=='Ans'){
				if(inputLimit){
					//do nothing
				}else{
					if(inputStr.length+Ans.toString().length>=inputMaxL){
						inputStr+=Ans;
						inputStr=inputStr.slice(0,inputMaxL);//取前60个字符
						inputStr+='...';//加...
						inputLimit=true;
					}else{
						//console.log('inputStr.length='+inputStr.length);
						//console.log('Ans.length='+Ans.length);
						//console.log(typeof(Ans));
						//console.log(parseInt(inputStr.length)+Ans.toString().length);
						inputStr+=Ans;
					}
				}
				showInput();
				hasACclick=false;
			}else{
				//先判断是否超过限制
				switch($(this).html()){
					case '='://先判断inputStr是否为有效字符串：无连续运算符、结尾不是运算符.运算符号需要转义
							 if(!inputLimit){
							 	if(/^[\*\/\.]/g.test(inputStr) || /[\+\-\*\/\.]$/g.test(inputStr) || /[\+\-\*\/\.][\+\-\*\/\.]/g.test(inputStr)){
							 		$('#result p:eq(1)').html('error!');
							 		$('#result p:eq(1)').css('color','red');
							 	}else{
							 		$('#result p:eq(1)').css('color','white');
							 		result=eval(inputStr);
							 		//console.log(result);
							 		Ans=result;
							 		$('#result p:eq(0)').html('Ans='+result);
							 		if(result.toString().length>=10){
							 			$('#result p:eq(1)').html(result.toString().slice(0,resultMaxL)+'...');
							 		}else{
							 			$('#result p:eq(1)').html(result);
							 		}
							 	}
							 		
							 }
							 break;
					case 'AC':inputStr='';
							  $('#result p:eq(1)').html('');
							  inputLimit=false;
							  showInput();
							  ///判断是否为连续删除键
							  if(hasACclick){
							  	Ans='';
							  	$('#result p:eq(0)').html('');
							  }
							  hasACclick=true;
							  break;
					case 'AE':if(inputLimit){
							  	var num=inputStr.length-4;
							  	inputStr=inputStr.substring(0,num);
							  	inputLimit=false;
							  }else{
							  	inputStr=inputStr.slice(0,inputStr.length-1);
							  }
							  //console.log(inputStr.length);
							  showInput();
							  break;
				}
			}
		
		
		
	});

	function showInput(){
		$('#inputContent p').html(inputStr);
	}
});