/*design & code by riversword*/
$(document).ready(function(){
	var inputStr="",
		result="", 
		Ans="",
		inputLimit=false,
		inputMaxL=60,
		resultMaxL=10,
		hasACclick=false,
	 	buttons=$('table td');
	
	buttons.click(function(){

			if($(this).html()!='='&& $(this).html()!='AC' && $(this).html()!='AE' && $(this).html()!='Ans'){
				//when the length of input beyond the limit, do nothing
				if(inputLimit){
					//do nothing
				}else{
					if(inputStr.length>=inputMaxL){
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
						inputStr=inputStr.slice(0,inputMaxL);//get the 60 characters from beginnng
						inputStr+='...';
						inputLimit=true;
					}else{
						inputStr+=Ans;
					}
				}
				showInput();
				hasACclick=false;
			}else{
				switch($(this).html()){
					case '=':
							 if(!inputLimit){
							 	if(/^[\*\/\.]/g.test(inputStr) || /[\+\-\*\/\.]$/g.test(inputStr) || /[\+\-\*\/\.][\+\-\*\/\.]/g.test(inputStr)){
							 		//beginning with math operator, will output "error"
							 		$('#result p:eq(1)').html('error!');
							 		$('#result p:eq(1)').css('color','red');
							 	}else{
							 		$('#result p:eq(1)').css('color','white');
							 		result=eval(inputStr);
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
							  if(hasACclick){//double click "AC" will clear "Ans"
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
							  showInput();
							  break;
				}
			}
			
	});

	function showInput(){
		$('#inputContent p').html(inputStr);
	}
});