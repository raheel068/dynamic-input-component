/**
 * Main js file
 * 
 * @author Raheel
 *
 */

$(document).ready(function(){
	// Message array which contains the information about the different states
	var msg_arr = {
		'default':{legend:'Default',msg:'Modify the data in this field.' },
		'focus':{ legend:'Focus',msg:'Modify the data in this field.' },
		'valid':{ legend:'Valid',msg:'The data is valid.' },
		'invalid':{ legend:'Invalid',msg:'The data is invalid.' },
		'limbo':{ legend:'Limbo',msg:'The data is being validated...' },
	};
	
	
	//When the input field get a focus
	$("#field1").on("focus focusin",function(e){
		showState(this,'focus');
	});
	
	//When the input field get a focus
	$("#field1").on("blur focusout",function(e){
		showState(this,'default');
	});
	
	//When user press the key to input the a character
	$("#field1").on("keydown",function(e){
		showState(this,'limbo');
	});
	
	//When user releases the key after typing the character
	$("#field1").on("keyup",function(e){
		var input_val = $(this).val();
		validate_string(this,input_val);
	});
	
	/**
	 * It first selects all <fieldset>-elements, then filters for class ".input-wrapper" 
	 * and sets these to class="input-wrapper". 
	 * After that the filter is revoked (.end()) and all "non-.input-wrapper" elements are 
	 * cleared of all possible classes.
	 */
	function resetState(){
		$('fieldset').filter('.input-wrapper').attr('class', 'input-wrapper')
                 .end().not('.input-wrapper').removeClass();
	}
	
	/**
	 * It first reset all states and then set states based on the input string value. 
	 * If the input string is empty then the state should be set to focus.
	 * If the length of input field is less than three then state should be set invalid.
	 * If the input string contains number or letters then the string be set valid.
	 * If none of the above conditions are met the the state should be set to invalid.
	 *
	 * @param  {String} input_val Input value of the text field
	 */
	function validate_string(input_el,input_val){
		if(input_val == ''){//show focus state if input is empty
			showState(input_el,'focus');
		} else if(input_val.length < 3){ //allowed minimum length is 3
			showState(input_el,'invalid');
		} else if(/^[a-zA-Z0-9]+$/.test(input_val)){ //check if the string is alphanumeric
			showState(input_el,'valid');
		} else { //show invalid msg if none of the above conditions are met
			showState(input_el,'invalid');
		}
	}
	
	
	/**
	 * It first reset active state and then apply the current state to the input. 
	 * It also shows the info for different states.
	 *
	 * @param  {String} state state of the element to be set
	 */
	function showState(input_el,state){
		//get current state of input
		var currentState = $(input_el).data("state");
		
		//if state is set as valid or invalid don't change the state when user focus in or out of input field.
		if((state == 'focus' || state == 'default') && (currentState == 'valid' || currentState == 'invalid')){
			state = currentState;
		} else {
			//reset the current state of input 
			resetState();
			
			$("fieldset.input-wrapper").addClass(state);
			
			$(".input-validation-msg").show();
			$(".input-validation-msg li").text(msg_arr[state].msg);
			
			$(".input-legend").show();
			$(".input-legend").text(msg_arr[state].legend);
		}
		
		
		//set the new state of input element
		$(input_el).data('state',state);
		
	}
	
});

