import { log } from 'gulp-util';
import * as flsFunctions from './modules/webp-supports.js';

flsFunctions.isWebp();

// /**
//  * Получение данных с сервера
//  * @param {*} url - путь запроса
//  * @returns - обьект js
//  */
// const getData = async url => {
// 	let res = await fetch(url);
// 	if (!res.ok) {
// 		throw new Error(`Could not fetch ${url}, status : ${res.status}`);
// 	}
// 	return await res.json();
// };

Vue.component('types', {
	props: ['btns', 'answers', 'userCurrentBranch'],
	data() {
		return {};
	},
	template: `<div class="content">
	<div class="form">
		<div class="form-main__container">
			<h2 class="form__title">Welcome!</h2>
			<h3 class="form__subtitle">Please choose your treatment</h3>
			<div class="btn__list">
				<template v-for="(item, index) in btns">
						<input type="checkbox" class="hide-input"
						:key="'types'+index"
						:name="'types'+index"
						:id="item.name"
						:checked="item.isChecked"
						@click="cheked(item)"
						/>
						<label class="main__btn" :for="item.name">{{item.name}}</label>
				</template>
			</div>
		</div>
	</div>
	<div class="left-section">
		<div class="info" v-for="user in answers">
			<div class="info__container">
				<ul class="info__list">
					<li class="info__elem" v-for="firstBranch in user.branchs[0]">
						<span class="info__elem__title">{{firstBranch.title}}:</span>
						<span class="info__elem__name" v-for="(item, index) in getList(user.branchs,firstBranch.title)">
							<template v-if="item.price">{{item.name}} - {{item.price}}$, </template>
							<template v-if="item.name">{{item.name}}, </template>
						</span>
					</li>
				</ul>
				<p class="info__total info__total--last">
						<span class="info__total__title">Total</span>
						<span class="info__total__price">{{user.totalPrice}}$</span>
				</p>
			</div>
		</div>
	</div>
</div>`,
	methods: {
		cheked(elem) {
			this.btns.forEach(element => {
				element.isChecked = false;
			});
			elem.isChecked = true;

			this.$emit('typesUpdate', { check: this.btns });
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].checked) {
							braches[index][key].checked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
	},
});

const app = new Vue({
	el: '#app',
	data: {
		allQuestions: ['types'],
		renderQuestion: 0,
		renderAnswer: 'types',
		currentUser: 'mainUser',
		currentBranch: 0,

		types: [],
		countries: [],
		clinics: [],
		treaments: [],
		sub: [],
		extras: [],
		addTreament: [
			{
				name: 'Yes',
				isChecked: false,
			},
			{
				name: 'No',
				isChecked: false,
			},
		],
		subCurrency: '$',
		currencyCollapse: false,
		nightCollapse: false,
		nights: 4,

		currency: {
			'€': 0.93,
			'₴': 29.35,
			$: 1,
		},
		answers: {
			mainUser: {
				totalPrice: 0,
				branchs: [{}],
			},
		},
	},
	mounted() {
		this.types = [
			{
				id: 1,
				name: 'Hair',
				isChecked: false,
			},
			{
				id: 2,
				name: 'Face',
				isChecked: false,
			},
			{
				id: 3,
				name: 'Plastic',
				isChecked: false,
			},
			{
				id: 4,
				name: 'Dental',
				isChecked: false,
			},
		];

		this.$set(this.userCurrentBranch, 'types', {
			link: 'types',
			title: 'Type',
			isView: true,
		});
	},
	methods: {
		typesUpdate(data) {
			console.log(data);
			this.$set(this.userCurrentBranch.types, 'cheked', data.check);
		},
		typeCheck(name, elem) {
			this.$set(this.userCurrentBranch.types, 'name', name);

			setTimeout(() => {
				this.countries = [
					{
						id: 1,
						category_id: 1,
						name: 'Ukraine',
						isChecked: false,
					},
					{
						id: 2,
						category_id: 1,
						name: 'France',
						isChecked: false,
					},
					{
						id: 3,
						category_id: 1,
						name: 'Itali',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'countries', {
					name: '',
					link: 'countries',
					title: 'Countries',
					isView: true,
				});
			}, 100);

			setTimeout(() => {
				this.renderAnswer = 'countries';
			}, 100);
		},

		countriesCheck(name, elem) {
			this.$set(this.userCurrentBranch.countries, 'name', name);

			setTimeout(() => {
				this.clinics = [
					{
						id: 1,
						category_id: 1,
						name: 'Clinic A',
						isChecked: false,
					},
					{
						id: 2,
						category_id: 1,
						name: 'Clinic B',
						isChecked: false,
					},
					{
						id: 3,
						category_id: 1,
						name: 'Clinic X',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'clinics', {
					link: 'clinics',
					title: 'Clinic',
					isView: true,
				});
			}, 100);

			setTimeout(() => {
				this.renderAnswer = 'clinics';
			}, 100);
		},
		clinicsCheck(name, elem) {
			this.$set(this.userCurrentBranch.clinics, 'name', name);

			setTimeout(() => {
				this.treaments = [
					{
						id: 1,
						name: 'Hair Transplant',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Beard & Mustache Trasnplant',
						isChecked: false,
					},
					{
						id: 3,
						name: 'Eyebrows Transplant',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'treaments', {
					link: 'treaments',
					title: 'Treaments',
					isView: true,
				});
			}, 100);

			setTimeout(() => {
				this.renderAnswer = 'treaments';
			}, 100);
		},
		treamentsCheck(name) {
			this.$set(this.userCurrentBranch.treaments, 'name', name);

			setTimeout(() => {
				this.sub = [
					{
						id: 1,
						name: 'FUE - Team',
						price: 1050,
						calcPrice: 1050,
						isChecked: false,
					},
					{
						id: 2,
						name: 'DHI - Team',
						price: 1230,
						calcPrice: 1230,
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'sub', {
					link: 'sub',
					title: 'Sub treaments',
					isView: true,
				});
			}, 100);

			setTimeout(() => {
				this.renderAnswer = 'sub';
			}, 100);
		},
		subCheck(name, price, elem) {
			this.$set(this.userCurrentBranch.sub, 'name', name);
			this.$set(this.userCurrentBranch.sub, 'price', price);

			let objectSub = this.userCurrentBranch.sub;

			this.$set(
				this.answers[this.currentUser],
				'totalPrice',
				this.answers[this.currentUser].totalPrice + objectSub.price
			);

			setTimeout(() => {
				this.extras = [
					{
						id: 1,
						name: 'Dr. channel Opening',
						price: 300,
						link: 'extras',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Beard Hair Extraction',
						price: 330,
						link: 'extras',
						isChecked: false,
					},
					{
						id: 2,
						name: 'Sedation',
						price: 200,
						link: 'extras',
						isChecked: false,
					},
				];
				this.$set(this.userCurrentBranch, 'extras', {
					link: 'extras',
					title: 'Extras',
					isView: true,
					checked: this.extras,
				});
			}, 100);

			setTimeout(() => {
				this.renderAnswer = 'extras';
			}, 100);
		},
		extrasCheck(elem) {
			let objectSub = this.answers[this.currentUser].totalPrice;

			if (elem.isChecked) {
				elem.isChecked = false;
				this.$set(this.answers[this.currentUser], 'totalPrice', objectSub - elem.price);
			} else {
				elem.isChecked = true;
				this.$set(this.answers[this.currentUser], 'totalPrice', objectSub + elem.price);
			}

			let allExtrasChecked = [];

			this.extras.forEach(element => {
				allExtrasChecked.push(element);
			});
			this.$set(this.userCurrentBranch.extras, 'checked', allExtrasChecked);
		},
		extrasNoCheck() {
			this.$set(this.userCurrentBranch, 'addTreament', {
				link: 'add-treament',
				title: 'Additional Treatment',
				isView: true,
			});
			setTimeout(() => {
				this.renderAnswer = 'add-treament';
			}, 100);
		},
		treamentCheck(name) {
			this.$set(this.userCurrentBranch.addTreament, 'name', name);

			if (name === 'Yes') {
				this.currentBranch += 1;
				this.$set(this.answers[this.currentUser].branchs, this.currentBranch, {
					type: {
						name: '',
						link: 'types',
						title: 'Type',
						isView: true,
					},
				});

				setTimeout(() => {
					this.renderAnswer = 'types';
				}, 100);
			}
		},
		goTo(indexBranch, link) {
			this.currentBranch = indexBranch;
			this.renderAnswer = link;
		},
		getList(braches, name) {
			let list = [];
			for (let index = 0; index < braches.length; index++) {
				// eslint-disable-next-line no-restricted-syntax
				for (const key in braches[index]) {
					if (braches[index][key].title === name) {
						if (braches[index][key].checked) {
							braches[index][key].checked.forEach(element => {
								if (element.isChecked === true) list.push(element);
							});
						} else {
							list.push(braches[index][key]);
						}
					}
				}
			}
			return list;
		},
	},
	computed: {
		userCurrentBranch() {
			return this.answers[this.currentUser].branchs[this.currentBranch];
		},
	},

	watch: {
		subCurrency(val) {
			this.sub.forEach(element => {
				element.calcPrice = element.price * this.currency[this.subCurrency];
			});
		},
	},
});
