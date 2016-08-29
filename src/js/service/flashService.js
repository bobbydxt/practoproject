	app.service('flashService', ['Flash',
	 function(Flash){
		var flashService={};
		/**
		 * Sends flash based on response type
		 * @param  {status} weather it is true or false
		 * @param  {message} data to flash
		 * @author [Bobby Dixit]
		 */
		flashService.successResponse = function(status,message)
		{
			if(status===true)
			{
				Flash.create('success', message);
			}
			else
			{
				Flash.create('warning', message);
			}
		}
		/**
		 * Sends Warning flash message
		 * @param  {message}
		 * @author [Bobby Dixit]
		 */
		flashService.warning = function(message)
		{
			Flash.create('warning',message);
		}
		return flashService;
	}])