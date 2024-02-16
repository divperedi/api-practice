'use strict';

import apiHandler from './apiHandler.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    fetchActivity();
})

async function fetchActivity() {
    try {
        const activity = await apiHandler.fetchData('https://www.boredapi.com/api/activity/');
        console.log(activity);

        if (activity) {
            renderActivity(activity);
        } else {
            console.log('No activities found...');
        }
    } catch (error) {
        console.log(error);
    }
}

async function renderActivity(activity) {
    const listRef = document.querySelector('#activityResultsList');

    const priceMessage = activity.price > 0 ? 'This activity might cost you some...' : 'Woohoo! It is free!';
    const participantsMessage = activity.participants > 1 ? 'You need a company to do that' : 'You can do that on your own';
    const activityListContent = `
    <li class="activity-results__item-header">${activity.activity}</li>
    <li class="activity-results__item">Company: ${participantsMessage}</li>
    <li class="activity-results__item">Price: ${priceMessage}</li>
    <li class="activity-results__item">Category: ${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</li>
    `;

    listRef.innerHTML = activityListContent;

    const headerRef = document.querySelector('.activity-results__item-header');
    typeEffect(headerRef, 70);

    const listItemRef = document.querySelectorAll('.activity-results__item');
    listItemRef.forEach(item => {
        item.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 3000,
        });
    });
}

async function typeEffect(element, speed) {
    if (!element) {
        console.error('Element not found.');
        return;
    }

    let text = element.innerHTML;
    element.innerHTML = "";

    let i = 0;
    let timer = setInterval(function () {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}