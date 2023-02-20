// eslint-disable-next-line no-unused-vars
const CourseHandling = (function (Courses) {
	const SHOW = 'js-show';
    const HIDE = 'js-hide';

    let courseItems;
    let registerButtons;


    /**
     * Das entsprechende Anmeldeformular von 'JoyOfWhitewater' oder 'Outdoor Engadin' aufrufen.
     * Und die Kursdaten mitgeben.
     * @param {*} event 
     */
    function goToRegisterForm(event){
        
        console.log('event: '+event.parentElement);
        console.log('id: '+event.parentElement.getAttribute('id'));

        const registerButtonWrapper = event.parentElement;
        const courseId = registerButtonWrapper.getAttribute('id');
        let url;

        //Den Kurs mit der entsprechenden courseId aus dem statischen Speicher holen.
        const currentCourse = Courses.getCoursesFromStaticStorage().filter((course) => {
            return course.id === courseId;
        });

        if (registerButtonWrapper.getAttribute('db') === 'joyofwhitewater') {
			url = 'https://www.joyofwhitewater.ch/kanukursanmeldung.html';
		} else {
			url = 'http://www.outdoor-engadin.ch/index.php?id=69';
		}

        console.log('currentCourse: ' + JSON.stringify(currentCourse));
        window.open(url + '?name=' + currentCourse[0].name + '&vonDatum=' + currentCourse[0].vonDatum);
    }


    /**
     * Kreiert ein Grid mit zwei Spalten, je 6 Teile breit.
     * Füllt nur die linke Spalte, die rechte bleibt leer.
     * @param {*} titleLeft 
     * @param {*} textLeft 
     * @returns 
     */
    function createADetailOfACourseListItemLeft(titleLeft, textLeft) {
		const gridX12DetailElement = document.createElement('div');
		gridX12DetailElement.classList.add('gridx12');

		const gridX12Col1 = document.createElement('div');
		gridX12Col1.classList.add('gridx12__courseItemDetail--col1of2');
		if (titleLeft !== undefined && titleLeft !== '') {
			const titleOfDetailElement = document.createElement('h4');
			titleOfDetailElement.classList.add('course-detail__title');
			titleOfDetailElement.innerText = titleLeft;
			gridX12Col1.appendChild(titleOfDetailElement);
		}
		const textOfDetailElement = document.createElement('p');
		textOfDetailElement.innerHTML = textLeft;
		gridX12Col1.appendChild(textOfDetailElement);

		const gridX12Col2 = document.createElement('div');
		gridX12Col2.classList.add('gridx12__courseItemDetail--col2of2');

		gridX12DetailElement.appendChild(gridX12Col1);
		gridX12DetailElement.appendChild(gridX12Col2);

		return gridX12DetailElement;
	}


    /**
     * Rendert den 'Anmelden' Button.
     * @param {*} courseDate Array mit allen Kursen
     * @param {*} company    Firma, entweder 'outdoorengadin' oder 'joyofwhitewater'
     * @returns 
     */
    function createRegisterButton(courseDate, company){
        const registerButtonWrapper = document.createElement('div');
		registerButtonWrapper.classList.add('register-button-wrapper');
        registerButtonWrapper.setAttribute('id', courseDate.id);
        registerButtonWrapper.setAttribute('db', company)

        const registerButton = document.createElement('button');
		registerButton.classList.add('register-button');

        const registerButtonText = document.createElement('span');
        registerButtonText.innerText = 'Anmelden';

        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const iconPolyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        
        iconSvg.setAttribute('viewBox', '0 0 13 10');
        iconSvg.setAttribute('height', '10px');
        iconSvg.setAttribute('width', '15px');

        iconPath.setAttribute('d', 'M1,5 L11,5');
        iconPolyline.setAttribute('points', '8 1 12 5 8 9');
        
        iconSvg.appendChild(iconPath);
        iconSvg.appendChild(iconPolyline);

        registerButton.appendChild(registerButtonText);
        registerButton.appendChild(iconSvg);
        registerButtonWrapper.appendChild(registerButton);
        
        return registerButtonWrapper;
    }


    /**
     * Liefert ist css Klasse zurück, wo der Kurs oder die Reise gerendert werden soll.
     * @param {*} courseType ist 'course' oder 'journey'
     * @param {*} company    ist 'outdoorengadin' oder 'joyofwhitewater'
     * @returns 
     */
    function getCssClassWhereToRenderNextCourse(courseType, company){
        if (company === 'joyofwhitewater') {
            if (courseType === 'course') {
                return 'joy-of-whitewater-course';
            } else {
                return 'joy-of-whitewater-journey';
            }
        }
        if (courseType === 'course') {
            return 'outdoor-engadin-course';
        } else {
            return 'outdoor-engadin-journey';
        }
    }


    /**
     * Rendert den nächsten Kurs oder die nächste Paddelreise für 'JoyOfWhitewater' oder 'Outdoor Engadin'.
     * @param {*} courseDate  Array mit allen Kursdaten
     * @param {*} courseType  ist 'course' oder 'journey'
     * @param {*} company     ist 'outdoorengadin' oder 'joyofwhitewater'
     */
    function renderNextCourse(courseDate, courseType, company) {
        const breakPointLarge = Globals.get().breakpointLarge;
        const courseItemWrapper = document.querySelector('.course-item-wrapper.' + getCssClassWhereToRenderNextCourse(courseType, company));

        if (courseItemWrapper !== null) {
            // delete current course date
            while (courseItemWrapper.firstChild) {
                courseItemWrapper.removeChild(courseItemWrapper.firstChild);
            }

            //Kreiert das Kursitem (die Zeile die immer sichtbar ist)
            const courseItem = document.createElement('a');
            courseItem.classList.add('course-item');
            courseItem.setAttribute('href', 'javascript:;');

            const courseItemName = document.createElement('div');
            courseItemName.classList.add('course-item__name-wrapper');
            const courseName = document.createElement('span');
            courseName.classList.add('course-item__name');
            courseName.innerText = courseDate.name;
            courseItemName.appendChild(courseName);

            const courseItemPlace = document.createElement('div');
            courseItemPlace.classList.add('course-item__place-wrapper');
            const coursePlace = document.createElement('div');
            coursePlace.classList.add('course-item__place');
            const courseCity = document.createElement('span');
            courseCity.classList.add('course-place__city');
            courseCity.innerText = courseDate.ort;
            coursePlace.appendChild(courseCity);
            if (courseDate.typ === 'Paddelreise'){
                const courseCountry = document.createElement('span');
                courseCountry.classList.add('course-place__country');
                courseCountry.innerText = courseDate.land;
                coursePlace.appendChild(courseCountry);
            } else {
                const courseRiver = document.createElement('span');
                courseRiver.classList.add('course-place__river');
                courseRiver.innerText = courseDate.fluss;
                coursePlace.appendChild(courseRiver);
            }
            courseItemPlace.appendChild(coursePlace);

            const courseItemDuration = document.createElement('div');
            courseItemDuration.classList.add('course-item__duration-wrapper');
            const courseDuration = document.createElement('span');
            courseDuration.classList.add('course-item__duration');
            const calculatedDuration = Dates.calculateDurationBetweenTwoDates(courseDate.bisDatum, courseDate.vonDatum);
            courseDuration.innerText = calculatedDuration.toString();
            if (calculatedDuration > 1) {
                courseDuration.innerText += ' Tage';
            } else {
                courseDuration.innerText += ' Tag';
            }
            courseItemDuration.appendChild(courseDuration);

            const courseItemDate = document.createElement('div');
            courseItemDate.classList.add('course-item__date-wrapper');
            const courseD = document.createElement('div');
            courseD.classList.add('course-item__date');
            const courseFrom = document.createElement('span');
            courseFrom.classList.add('course-date__from');
            if (window.innerWidth >= breakPointLarge) {
                courseFrom.innerText = Dates.convertToMediumWithoutYearDateFormat(courseDate.vonDatum);
            } else {
                courseFrom.innerText = Dates.convertToShortWithoutYearDateFormat(courseDate.vonDatum);
            }

            const courseTo = document.createElement('span');
            courseTo.classList.add('course-date__to');
            if (window.innerWidth >= breakPointLarge) {
                courseTo.innerText = Dates.convertToMediumWithYearDateFormat(courseDate.bisDatum);
            } else {
                courseTo.innerText = Dates.convertToShortWithYearDateFormat(courseDate.bisDatum);
            }
            courseD.appendChild(courseFrom);
            courseD.appendChild(courseTo);
            courseItemDate.appendChild(courseD);
				
            courseItem.appendChild(courseItemName);
            courseItem.appendChild(courseItemPlace);
            courseItem.appendChild(courseItemDuration);
            courseItem.appendChild(courseItemDate);

            // Kreiert das Detail zum Kurs (Wird angezeigt, wenn auf die Zeile geklickt wird.)
            const courseItemDetail = document.createElement('div');
            courseItemDetail.classList.add('course-item-detail');

            const courseItemDetailContentWrapper = document.createElement('div');
            courseItemDetailContentWrapper.classList.add('course-item-detail__content-wrapper');

            const gridX12Costs = document.createElement('div');
            gridX12Costs.classList.add('gridx12');

            const gridX12CostsCol1 = document.createElement('div');
            gridX12CostsCol1.classList.add('gridx12__courseItemDetail--col1of2');

            const titleCosts = document.createElement('h4');
            titleCosts.classList.add('course-detail__title');
            titleCosts.innerText = 'Kosten';
            const costList = document.createElement('ul');
            const textCostCourse = document.createElement('li');

            //Es gibt mehrere Preise
            if (parseFloat(courseDate.preisMaterial) > 0) {
                textCostCourse.innerHTML = '<span class="course-detail__amount--part">' + parseFloat(courseDate.preisKurs) + '</span>';
                textCostCourse.innerHTML += 'Kurs';
                costList.appendChild(textCostCourse);
                
                const textCostEquipment = document.createElement('li');
                textCostEquipment.innerHTML = '<span class="course-detail__amount--part">' + parseFloat(courseDate.preisMaterial) + '</span>';
                textCostEquipment.innerHTML += 'gesamte Ausrüstung (falls benötigt)';
                costList.appendChild(textCostEquipment);
                
                const textCostTotal = document.createElement('li');
                const totalCost = parseFloat(courseDate.preisKurs) + parseFloat(courseDate.preisMaterial);
                textCostTotal.innerHTML = '<span class="course-detail__amount--total">' + totalCost + '</span>';
                textCostTotal.innerHTML += 'Total';
                costList.appendChild(textCostTotal);
            
            //Es gibt nur einen Preis (den Preis für den Kurs)
            } else {
                textCostCourse.innerHTML = '<span class="course-detail__amount--part">' + parseFloat(courseDate.preisKurs) + '</span>';
                costList.appendChild(textCostCourse);
            }
            gridX12CostsCol1.appendChild(titleCosts);
            gridX12CostsCol1.appendChild(costList);

            const gridX12CostsCol2 = document.createElement('div');
            gridX12CostsCol2.classList.add('gridx12__courseItemDetail--col2of2');
            gridX12CostsCol2.classList.add('content-at-the-end');

            //Den Anmelde Knopf erzeugen
            const registerButton = createRegisterButton(courseDate, company);
			gridX12CostsCol2.appendChild(registerButton);

            gridX12Costs.appendChild(gridX12CostsCol1);
            gridX12Costs.appendChild(gridX12CostsCol2);

            if (courseDate.beschreibung !== null &&
                courseDate.beschreibung !== undefined &&
                courseDate.beschreibung !== '') {
                courseItemDetailContentWrapper.appendChild(createADetailOfACourseListItemLeft('Details', courseDate.beschreibung));
            }

            //Wenn es eine Paddelreise ist, einen Link anzeigen, wo auf die entsprechende Webseite gesprungen wird.
            if (courseDate.typ === 'Paddelreise'){
                const url = 'https://joyofwhitewater.ch/paddelreisen.html';
                const detailsLink = document.createElement('a');
                detailsLink.classList.add('link-in-courseItemDetail');
                detailsLink.setAttribute('target', '_blank');
    
                switch (courseDate.paddelreiseGruppe) {
                    case 'Korsika':
                        detailsLink.setAttribute('href', url + '#paddleJourneyKorsikaAnchor');
                        break;
                    case 'Piemont':
                        detailsLink.setAttribute('href', url + '#paddleJourneyPiemontAnchor');
                        break;
                    case 'Soca':
                        detailsLink.setAttribute('href', url + '#paddleJourneySocaAnchor');
                        break;
                    case 'Georgien':
                        detailsLink.setAttribute('href', url + '#paddleJourneyGeorgienAnchor');
                        break;
                    case 'Griechenland':
                        detailsLink.setAttribute('href', url + '#paddleJourneyGriechenlandAnchor');
                        break;
                    case 'Albanien':
                        detailsLink.setAttribute('href', url + '#paddleJourneyAlbanienAnchor');
                        break;
                    case 'Durance':
                        detailsLink.setAttribute('href', url + '#paddleJourneyDuranceAnchor');
                        break;
                    default:
                        detailsLink.setAttribute('href', url);
                        break;
                }
    
                detailsLink.innerText = 'weitere Details zu ' + courseDate.name;

                const gridX12DetailElement = document.createElement('div');
                gridX12DetailElement.classList.add('gridx12');
        
                const gridX12Col1 = document.createElement('div');
                gridX12Col1.classList.add('gridx12__courseItemDetail--col1of2');
                gridX12Col1.appendChild(detailsLink);
                
                const gridX12Col2 = document.createElement('div');
                gridX12Col2.classList.add('gridx12__courseItemDetail--col2of2');
        
                gridX12DetailElement.appendChild(gridX12Col1);
                gridX12DetailElement.appendChild(gridX12Col2);
        
                courseItemDetailContentWrapper.appendChild(gridX12DetailElement);
            }

    
            if (courseDate.anmeldeSchluss !== null &&
                courseDate.anmeldeSchluss !== undefined &&
                courseDate.anmeldeSchluss !== '') {
                courseItemDetailContentWrapper.appendChild(createADetailOfACourseListItemLeft(
                    '', 
                    'Anmeldeschluss ist bis am ' + Dates.convertToMediumWithYearDateFormat(courseDate.anmeldeSchluss) + '.'
                ));
            }
    
            if (courseDate.treffpunkt !== null &&
                courseDate.treffpunkt !== undefined &&
                courseDate.treffpunkt !== '') {
                courseItemDetailContentWrapper.appendChild(createADetailOfACourseListItemLeft('Treffpunkt', courseDate.treffpunkt));
            }

            courseItemDetailContentWrapper.appendChild(gridX12Costs);
            courseItemDetail.appendChild(courseItemDetailContentWrapper);

            courseItemWrapper.appendChild(courseItem);
            courseItemWrapper.appendChild(courseItemDetail);
		}
    }


	function toggleCourseDetails(event) {
		const drawer = event.parentElement.parentElement.lastElementChild;
        const courseItemIcon = event.parentElement.parentElement.nextSibling.nextSibling;

		if (drawer.classList.contains(SHOW)) {
			drawer.classList.remove(SHOW);
            courseItemIcon.classList.remove(HIDE);
		} else {
			drawer.classList.add(SHOW);
            courseItemIcon.classList.add(HIDE);
		}
	}


	function initiate() {	
		courseItems = document.querySelectorAll('.course-item');
		if (courseItems !== null) {
			courseItems.forEach((courseItem) => {
				courseItem.addEventListener('click', (event) => {
					toggleCourseDetails(event.target);
				});
			});
		}

        registerButtons = document.querySelectorAll('.register-button');
		if (registerButtons !== null) {
			registerButtons.forEach((registerButton) => {
				registerButton.addEventListener('click', (event) => {
					goToRegisterForm(event.target);
				});
			});
		}		
	}


	// public api
	return {
		init: initiate,
        renderNextCourse
	};
})(Courses);
