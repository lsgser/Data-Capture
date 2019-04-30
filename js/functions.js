
/*
	Author Lesego Seritili
	These are all the functions that will display ,render and send requests and recieve a response from the rest api to the backend data across 
*/
var initial_page=1;
var maximum_pages
var current_page

//Views the html for the index.html page
function View()
{
	$('#view').append(`
		<nav class="navbar navbar-expand-md bg-dark navbar-dark">
		  <a href="#" class="navbar-brand">Add Member</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="collapsibleNavbar">
		    <ul class="navbar-nav ml-auto">
		      <li class="nav-item">
		        <button type=button class="btn btn-primary" onclick="List()">Go To Data List</button>
		      </li>
		    </ul>
		  </div>	
		</nav>
		<div class="container" style="margin-bottom:6px;">
			<center>
				<h3>Add Member</h3>
				<div class="alert alert-danger" role="alert" id="response_error">
				</div>
				<div class="alert alert-success" role="alert" id="response_pass">
				</div>
				<br>
				<label>First Name:</label>
				<input class="form-control reduced" type="text" placeholder="Enter Name" id="name"/>

				<label>Surname:</label>
				<input class="form-control reduced" type="text" placeholder="Enter Surname" id="surname"/>

				<label>Birth Date:</label>
				<div class="form-group">
				    <label for="Year">Select Your Year:</label>
				    <select class="form-control reduced" id="year">
				    </select>
				</div>

				<div class="form-group">
				    <label for="Month">Select Your Month:</label>
				    <select class="form-control reduced" id="month">
				    </select>
				</div>

				<div class="form-group">
				    <label for="Day">Select Your Day:</label>
				    <select class="form-control reduced" id="day">
				    </select>
				</div>

				<label>Cellphone Number:</label>
				<input class="form-control reduced" type="text" placeholder="Enter Your Cellphone Number" id="cellphone"/>

				<label>Email Address:</label>
				<input class="form-control reduced" type="email" placeholder="Enter Your Email Address" id="email"/>

				<button class="btn btn-primary" onclick="Submit()">Submit</button>
				<br>
			</center>
		</div>
		`)

		$("#response_pass").hide()
		$("#response_error").hide()

		Year()
		Month()
		Day()	
}

/*********************************************************
The three functions below will create the birth date data
NB!! I did not code any birth date error filtering 
*********************************************************/
function Year()
{
	//Year
	for(var i=1900; i<= 2019;i++)
	{
		if(i==1900)
		{
			$('#year').append(`<option>Year</option>`)
		}
		else
		{
			$('#year').append(`<option>`+i+`</option>`)	
		}	
	}
}

function Month()
{
	//Month
	for(var i=0; i <=12;i++)
	{
		if(i==0)
		{
			$('#month').append(`<option>Month</option>`)
		}
		else
		{
			$('#month').append(`<option>`+i+`</option>`)	
		}	
	}
}

function Day()
{
	//Day
	for(var i=0; i<=31;i++)
	{
		if(i==0)
		{
			$('#day').append(`<option>Day</option>`)
		}
		else
		{
			$('#day').append(`<option>`+i+`</option>`)	
		}	
	}
}

/*This will be attached to the submit button when a user adds a new member*/
function Submit()
{
	$("#response_pass").hide()
	$("#response_error").hide()
	var name = $('#name').val()
	var surname =$('#surname').val()
	var day=$('#day').val()
	var month=$('#month').val()
	var year=$('#year').val()
	var cellphone=$('#cellphone').val()
	var email=$('#email').val()

	if(name && surname && day && month && year && cellphone && email && !isNaN(year) && !isNaN(month) && !isNaN(day))
	{
		axios.post('api/post.php',{name:name,surname:surname,day:day,month:month,year:year,cellphone:cellphone,email:email}).then(function(res){
			if(res.data.status==="Success")
			{
				$("#response_pass").html('Member Added Successfully')
				$("#response_pass").show()

				$('#name').val('')
				$('#surname').val('')
				$('#cellphone').val('')
				$('#email').val('')
			}
			else
			{
				$("#response_error").html(res.data.status)
				$("#response_error").show()			
			}	
		})

	}
	else
	{
		$("#response_error").html('Fill in all fields')
		$("#response_error").show()
	}
}

/*This will display html for the filter.html page*/
function FilterView()
{
	$('#filter_view').append(`
		<nav class="navbar navbar-expand-md bg-dark navbar-dark">
		  <a href="#" class="navbar-brand">Data List</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="collapsibleNavbar">
		    <ul class="navbar-nav ml-auto">
		      <li class="nav-item">
		        <button type=button class="btn btn-primary" onclick="Add()">Go To Add Member</button>
		      </li>
		    </ul>
		  </div>	
		</nav>
		<h6 id="page_nr"></h6>
		<div class="form-group">
		    <label for="type">Sort Data By</label>
		    <select class="form-control reduced" style="width:50%" id="type" onchange="DataSort()">
		    	<option value="0">Sort By</option>
		    	<option value="name">Name</option>
		    	<option value="surname">Surname</option>
		    	<option value="birth">Birth Date</option>
		    	<option value="email">Email</option>
		    	<option value="cell">Cellphone</option>
		    	<option value="date">Date Captured</option>
		    </select>
		    <label for="order">Order By</label>
		    <select class="form-control reduced" style="width:50%" id="order" onchange="DataSort()">
		    	<option value="0">Order By</option>
		    	<option value="asc">Ascending Order</option>
		    	<option value="desc">Descending Order</option>
		    </select>
		</div>
		<center>
			<caption>Members</caption>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Surname</th>
						<th>Birth</th>
						<th>Cellphone</th>
						<th>Email</th>
						<th>Date Captured</th>
					</tr>
				</thead>
				<tbody id="users">
				</tbody>
			</table>
			<nav aria-label="Page navigation">
				<ul class="pagination" id="pages">
			  	</ul>
			</nav>
		</center>
	`)
	InitialLoad()
}

function InitialLoad()
{
	console.log($('#type').val())
	axios.get('api/get.php?page='+initial_page).then(function(res){
		max_pages=parseInt(res.data[0].max_page)
		on_page=parseInt(res.data[0].on_page);

		maximum_pages=max_pages
		current_page=on_page
		$('#page_nr').html(`<u><h5>You are currently on page `+on_page+` of `+max_pages+`</h5></u>`)
		res.data.forEach(function(element,index){
			$('#users').append(`
				<tr>
					<td>`+(index+1)+`</td>
					<td>`+element.name+`</td>
					<td>`+element.surname+`</td>
					<td>`+element.birth+`</td>
					<td>`+element.cellphone+`</td>
					<td>`+element.email+`</td>
					<td>`+element.date_captured+`</td>
				</tr>`)
		})

		for(var i=1;i <= parseInt(max_pages); i++)
		{
			if(i==on_page)
			{
				$('#pages').append(`
			    	<li class="page-item active" onclick="ChangePage(`+i+`)" data-id="`+i+`"><a class="page-link" href="#">`+i+`</a></li>
				`)	
			}
			else
			{
				$('#pages').append(`
			    	<li class="page-item" onclick="ChangePage(`+i+`)" data-id="`+i+`"><a class="page-link" href="#">`+i+`</a></li>
				`)
			}	
		}

		if(max_pages ==1)
		{
			$('#pages').prepend(`<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>`)
			$('#pages').append(`<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>`)
		}
		else
		{
			$('#pages').prepend(`<li class="page-item disabled" onclick="Previous()" id="previous"><a class="page-link" href="#">Previous</a></li>`)
			$('#pages').append(`<li class="page-item" onclick="Next()" id="next"><a class="page-link" href="#">Next</a></li>`)
		}
	})
}

function ChangePage(page)
{
	if(isNaN($('#order').val()) && isNaN($('#type').val()))
	{
		var type = $("#type").val()
		var order = $("#order").val()
		axios.get('api/get.php?page='+page+'&type='+type+'&sort='+order+'').then(function(res){
			$('#users').html('')
			max_pages=parseInt(res.data[0].max_page)

			maximum_pages=max_pages
			current_page=page
			
			if(max_pages >1)
			{
				if(page == max_pages)
				{
					$('#next').removeClass("page-item").addClass("page-item disabled")
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				else if(page == 1)
				{
					$('#previous').removeClass("page-item").addClass("page-item disabled")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page>1 && current_page < maximum_pages)
				{
					$('#previous').removeClass("page-item disabled").addClass("page-item")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
			}
			$('#page_nr').html(`<u><h5>You are currently on page `+page+` of `+max_pages+`</h5></u>`)

			$("[data-id]").removeClass("page-item active").addClass("page-item")
			$("[data-id='"+page+"']").addClass("page-item active")

			res.data.forEach(function(element,index){
				$('#users').append(`
					<tr>
						<td>`+(index+1)+`</td>
						<td>`+element.name+`</td>
						<td>`+element.surname+`</td>
						<td>`+element.birth+`</td>
						<td>`+element.cellphone+`</td>
						<td>`+element.email+`</td>
						<td>`+element.date_captured+`</td>
					</tr>`)
			})
		})
	}
	else
	{
		axios.get('api/get.php?page='+page+'').then(function(res){
			$('#users').html('')
			max_pages=parseInt(res.data[0].max_page)

			maximum_pages=max_pages
			current_page=page
			
			if(max_pages >1)
			{
				if(page == max_pages)
				{
					$('#next').removeClass("page-item").addClass("page-item disabled")
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				else if(page == 1)
				{
					$('#previous').removeClass("page-item").addClass("page-item disabled")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page>1 && current_page < maximum_pages)
				{
					$('#previous').removeClass("page-item disabled").addClass("page-item")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
			}
			$('#page_nr').html(`<u><h5>You are currently on page `+page+` of `+max_pages+`</h5></u>`)

			$("[data-id]").removeClass("page-item active").addClass("page-item")
			$("[data-id='"+page+"']").addClass("page-item active")

			res.data.forEach(function(element,index){
				$('#users').append(`
					<tr>
						<td>`+(index+1)+`</td>
						<td>`+element.name+`</td>
						<td>`+element.surname+`</td>
						<td>`+element.birth+`</td>
						<td>`+element.cellphone+`</td>
						<td>`+element.email+`</td>
						<td>`+element.date_captured+`</td>
					</tr>`)
			})
		})	
	}
}
/*
	Will sort the data anytime a valid option is picked
*/

function DataSort()
{
	if(isNaN($('#order').val()) && isNaN($('#type').val()))
	{
		var type = $("#type").val()
		var order = $("#order").val()
		axios.get('api/get.php?page='+current_page+'&type='+type+'&sort='+order+'').then(function(res){
			$('#users').html('')
			max_pages=parseInt(res.data[0].max_page)

			maximum_pages=max_pages

			$('#page_nr').html(`<u><h5>You are currently on page `+current_page+` of `+max_pages+`</h5></u>`)

			res.data.forEach(function(element,index){
				$('#users').append(`
					<tr>
						<td>`+(index+1)+`</td>
						<td>`+element.name+`</td>
						<td>`+element.surname+`</td>
						<td>`+element.birth+`</td>
						<td>`+element.cellphone+`</td>
						<td>`+element.email+`</td>
						<td>`+element.date_captured+`</td>
					</tr>
				`)
			})
		})
	}
	else
	{
		//select
	}
}

function Next()
{
	if(current_page < maximum_pages)
	{
		var next = current_page+1
		if(isNaN($('#order').val()) && isNaN($('#type').val()))
		{
			var type = $("#type").val()
			var order = $("#order").val()
			axios.get('api/get.php?page='+next+'&type='+type+'&sort='+order+'').then(function(res){
				$('#users').html('')
				max_pages=parseInt(res.data[0].max_page)

				maximum_pages=max_pages
				current_page=next

				$('#page_nr').html(`<u><h5>You are currently on page `+next+` of `+max_pages+`</h5></u>`)

				$("[data-id]").removeClass("page-item active").addClass("page-item")
				$("[data-id='"+next+"']").addClass("page-item active")

				if(current_page==max_pages)//we disable the next button and enable the previous button
				{	
					$('#next').removeClass("page-item").addClass("page-item disabled")
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page >1 && current_page != max_pages)
				{
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				res.data.forEach(function(element,index){
					$('#users').append(`
						<tr>
							<td>`+(index+1)+`</td>
							<td>`+element.name+`</td>
							<td>`+element.surname+`</td>
							<td>`+element.birth+`</td>
							<td>`+element.cellphone+`</td>
							<td>`+element.email+`</td>
							<td>`+element.date_captured+`</td>
						</tr>`)
				})
			})
		}
		else
		{
			axios.get('api/get.php?page='+next+'').then(function(res){
				$('#users').html('')
				max_pages=parseInt(res.data[0].max_page)

				maximum_pages=max_pages
				current_page=next

				$('#page_nr').html(`<u><h5>You are currently on page `+next+` of `+max_pages+`</h5></u>`)

				$("[data-id]").removeClass("page-item active").addClass("page-item")
				$("[data-id='"+next+"']").addClass("page-item active")

				if(current_page==max_pages)//we disable the next button and enable the previous button
				{	
					$('#next').removeClass("page-item").addClass("page-item disabled")
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page >1 && current_page != max_pages)
				{
					$('#previous').removeClass("page-item disabled").addClass("page-item")
				}
				res.data.forEach(function(element,index){
					$('#users').append(`
						<tr>
							<td>`+(index+1)+`</td>
							<td>`+element.name+`</td>
							<td>`+element.surname+`</td>
							<td>`+element.birth+`</td>
							<td>`+element.cellphone+`</td>
							<td>`+element.email+`</td>
							<td>`+element.date_captured+`</td>
						</tr>`)
				})
			})	
		}
	}
}

function Previous()
{
	if(current_page > 1)
	{
		var previous = current_page-1
		if(isNaN($('#order').val()) && isNaN($('#type').val()))
		{
			var type = $("#type").val()
			var order = $("#order").val()

			axios.get('api/get.php?page='+previous+'&type='+type+'&sort='+order+'').then(function(res){
				$('#users').html('')
				max_pages=parseInt(res.data[0].max_page)

				maximum_pages=max_pages
				current_page=previous

				$('#page_nr').html(`<u><h5>You are currently on page `+previous+` of `+max_pages+`</h5></u>`)

				$("[data-id]").removeClass("page-item active").addClass("page-item")
				$("[data-id='"+previous+"']").addClass("page-item active")

				if(current_page==1)//we disable the previous button and enable the next button
				{	
					$('#previous').removeClass("page-item").addClass("page-item disabled")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page>1 && current_page != maximum_pages){
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				res.data.forEach(function(element,index){
					$('#users').append(`
						<tr>
							<td>`+(index+1)+`</td>
							<td>`+element.name+`</td>
							<td>`+element.surname+`</td>
							<td>`+element.birth+`</td>
							<td>`+element.cellphone+`</td>
							<td>`+element.email+`</td>
							<td>`+element.date_captured+`</td>
						</tr>`)
				})
			})
		}
		else
		{
			axios.get('api/get.php?page='+previous+'').then(function(res){
				$('#users').html('')
				max_pages=parseInt(res.data[0].max_page)

				maximum_pages=max_pages
				current_page=previous

				$('#page_nr').html(`<u><h5>You are currently on page `+previous+` of `+max_pages+`</h5></u>`)

				$("[data-id]").removeClass("page-item active").addClass("page-item")
				$("[data-id='"+previous+"']").addClass("page-item active")

				if(current_page==1)//we disable the previous button and enable the next button
				{	
					$('#previous').removeClass("page-item").addClass("page-item disabled")
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				else if(current_page>1 && current_page != maximum_pages){
					$('#next').removeClass("page-item disabled").addClass("page-item")
				}
				res.data.forEach(function(element,index){
					$('#users').append(`
						<tr>
							<td>`+(index+1)+`</td>
							<td>`+element.name+`</td>
							<td>`+element.surname+`</td>
							<td>`+element.birth+`</td>
							<td>`+element.cellphone+`</td>
							<td>`+element.email+`</td>
							<td>`+element.date_captured+`</td>
						</tr>`)
				})
			})	
		}
	}
}

function List()
{
	window.location.href="filter.html"
}

function Add()
{
	window.location.href="index.html"
}
