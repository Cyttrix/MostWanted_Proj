// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"

function app(people) {
	
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

//Search People Data Set Function

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);

	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':
			results = searchByTraits(people);
			break;
		default:
			return searchPeopleDataSet(people);
	}

	return results;
}

//Search People Data Set Scafold

function searchById(people) {
	const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	const idToSearchForInt = parseInt(idToSearchForString);
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}

function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}

//Search By Traits Function

function searchByTraits(people) {
	const traitToSearchForString = validatedPrompt(
		'Please enter in what type of trait search you would like to perform.',
		['height', 'weight', 'eyecolor'],
	);
	let results = [];
	switch (traitToSearchForString) {
		case 'height':
			results = searchByHeight(people);
			break;
		case 'weight':
			results = searchByWeight(people);
			break;
		case 'eyecolor':
			results = searchByEyeColor(people);
			break;
		default:
			return searchByTraits(people);
	}
	return results;

}

//Search By Traits Scafold

function searchByHeight(people) {
	const heightToSearchForString = prompt('please enter the height of the person you are searching for:');
	const heightToSearchInt = parseInt(heightToSearchForString);
	const heightFilterResults = people.filter((person) => person.height === heightToSearchInt);
	return heightFilterResults;
}

function searchByWeight(people) {
	const weightToSearchForString = prompt('please enter the weight of the person you are searching for:');
	const weightToSearchForInt = parseInt(weightToSearchForString);
	const weightFilterResults = people.filter((person) => person.weight === weightToSearchForInt);
	return weightFilterResults;
}

function searchByEyeColor(people) {
	const eyeColorToSearchFor = prompt('please enter the eyecolor of the person you are searching for:');
	const eyeColorFilterResults = people.filter((person) => person.eyeColor === eyeColorToSearchFor);
	return eyeColorFilterResults;
}


//Main menu function for displaying more info about person(s) searched

function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);

	switch (mainMenuUserActionChoice) {
		case 'info':
			displayPersonInfo(person, people);
			break;
		case 'family':
			let personFamily = findPersonFamily(person, people);
			alert(`
			Family: 
			${personFamily}`);
			break;
		case 'descendants':
			//! TODO
			// let personDescendants = findPersonDescendants(person, people);
			// displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

//Scafolding for mainMenu function

function displayPersonInfo(person, people) {


let findParents = people.filter(maybeParent => person.parents.includes(maybeParent.id));
if (findParents.length === 0){
	parents = "none";
} else {
	parents = "Parents: " + findParents.map(parent => parent.firstName + " " + parent.lastName).join(", ");
}


let findSpouse = people.find((maybeSpouse) => maybeSpouse.id === person.currentSpouse);

if(findSpouse === null) {
	spouse = "none";
} else {
	spouse = "Spouse: " + findSpouse.firstName + " " + findSpouse.lastName;
}


	alert(
	`
	Id: ${person.id}
	First Name: ${person.firstName}
	Last Name: ${person.lastName}
	Gender: ${person.gender}
	Date of Birth: ${person.dob}
	Height: ${person.height}
	Weight: ${person.weight}
	Eye Color: ${person.eyeColor}
	Occupation: ${person.occupation}
	${spouse}
	${parents}`);
}


function findPersonFamily(person, people) {
	
let findParents = people.filter(maybeParent => person.parents.includes(maybeParent.id));
if (findParents.length === 0){
	parents = "none";
} else {
	parents = "Parents: " + findParents.map(parent => parent.firstName + " " + parent.lastName).join(", ");
}


let findSpouse = people.find((maybeSpouse) => maybeSpouse.id === person.currentSpouse);

if(findSpouse === null) {
	spouse = "none";
} else {
	spouse = "Spouse: " + findSpouse.firstName + " " + findSpouse.lastName + " ";
}

return spouse + parents;

}



function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}
