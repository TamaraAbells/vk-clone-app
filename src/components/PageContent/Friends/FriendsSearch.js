import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// React Components

import RenderIcon from './../../RenderIcon';

// Styled Components

import {
	FriendsSearchContainer,
	FriendsSearchField,
	ParametersSearchContainer,
	SearchLabel,
	ChoiceCity,
	ChoiceItem,
	ChoiceAgeFrom,
	ChoiceAgeTo,
	ChoiceAge,
	ChoiceAgeOption,
	ChoiceSex,
	ChoiceSexText,
	ChoiceSexRadio,
	ChoiceSexLabel,
} from './FriendsStyled';
import Link from './../../UI/Link';

// Icons

import { search } from 'react-icons-kit/fa/search';
import { ic_keyboard_arrow_down } from 'react-icons-kit/md/ic_keyboard_arrow_down';

//  Actions

import searchFriends from './../../../actions/Friends/SearchFriends';
import fetchFriends from './../../../actions/Friends/FetchFriends';
import filterFriendsFemale from './../../../actions/Friends/FilterFemale';
import filterFriendsMale from './../../../actions/Friends/FilterMale';
import filterFriendsAny from './../../../actions/Friends/FilterAny';
import filterFriendsAgeFrom from './../../../actions/Friends/FilterAgeFrom';
import filterFriendsAgeTo from './../../../actions/Friends/filterAgeTo';

// Functions

import filterSexFemale from './filterSexFemale';
import filterSexMale from './filterSexMale';
import filterAgeFrom from './filterAgeFrom';
import filterAgeTo from './filterAgeTo';

const searchStyles = {
	color: '#466a94',
	cursor: 'pointer',
	opacity: '.9',
};

const arrowStyles = {
	color: '#466a94',
	cursor: 'pointer',
	opacity: '.9',
};

class FriendsSearch extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			parametersShow: false,
		};
	}
	componentDidMount() {
		this.props.dataFriends();
	}

	handleCLick(e) {
		if (!this.state.parametersShow) {
			this.setState({
				parametersShow: true,
			});
		} else {
			this.setState({
				parametersShow: false,
			});
		}
	}
	handleChange(e) {
		const rusRegExp = /[а-яА-ЯёЁ]/g;
		let inputValue = e.target.value;
		if (inputValue.search(rusRegExp) !== -1) {
			this.searchField.value = inputValue.replace(rusRegExp, '');
		} else {
			this.props.searchFriends(e.target.value.toLowerCase().trim());
		}
	}
	filteredFriends(e) {
		const friendsAny = this.props.friends;
		if (e.target.name === 'male') {
			if (e.target.checked) {
				const friendsMale = filterSexMale(this.props.friends);
				this.props.filterMale(friendsMale);
			} else {
				this.props.filterAny(friendsAny);
			}
			this.setState({
				female: false,
				male: e.target.checked ? true : false,
				any: false,
			});
		}
		if (e.target.name === 'any') {
			this.props.filterAny(friendsAny);
			this.setState({
				female: false,
				male: false,
				any: e.target.checked ? true : false,
			});
		}
		if (e.target.name === 'female') {
			if (e.target.checked) {
				const friendsFemale = filterSexFemale(this.props.friends);
				this.props.filterFemale(friendsFemale);
			} else {
				this.props.filterAny(friendsAny);
			}
			this.setState({
				female: e.target.checked ? true : false,
				male: false,
				any: false,
			});
		}
		if (e.target.name === 'age-from') {
			let filterAgesFrom = filterAgeFrom(this.props.friends, e.target.value);
			this.props.filterFrom(filterAgesFrom);
		}
		if (e.target.name === 'ange-to') {
			let filterAgesTo = filterAgeTo(this.props.friends, e.target.value)
		}
	}
	componentWillMount() {
		document.addEventListener('mousedown', this.outSideClick, false);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.outSideClick, false);
	}

	outSideClick = e => {
		if (!this.tooltip.contains(e.target)) {
			if (this.state.parametersShow) {
				this.setState({
					parametersShow: false,
				});
			}
			return;
		}
	};

	render() {
		let ageNumbers = [];
		for (let i = 14; i <= 80; i++) ageNumbers.push(i);
		return (
			<FriendsSearchContainer>
				<RenderIcon icon={search} size={18} style={searchStyles} />
				<FriendsSearchField
					placeholder="Start typing a friend's name"
					autoFocus={true}
					onChange={this.handleChange.bind(this)}
					ref={node => (this.searchField = node)}
					name="search-friends"
				/>
				<Link onClick={this.handleCLick.bind(this)}>Parameters</Link>
				<RenderIcon
					icon={ic_keyboard_arrow_down}
					size={16}
					style={arrowStyles}
				/>
				<ParametersSearchContainer
					show={this.state.parametersShow}
					ref={node => (this.tooltip = node)}
				>
					<SearchLabel>City</SearchLabel>
					<ChoiceCity placeholder="Choose City">
						{this.props.friends
							? this.props.friends.map((item, index) => {
									const city =
										item.location.city.charAt(0).toUpperCase() +
										item.location.city.slice(1);
									return <ChoiceItem key={index}>{city}</ChoiceItem>;
							  })
							: ''}
					</ChoiceCity>
					<SearchLabel>Age</SearchLabel>
					<ChoiceAge>
						<ChoiceAgeFrom
							name="age-from"
							onChange={this.filteredFriends.bind(this)}
						>
							{ageNumbers.map((item, index) => {
								return (
									<ChoiceAgeOption key={index} value={item}>
										from {item}
									</ChoiceAgeOption>
								);
							})}
						</ChoiceAgeFrom>
						<ChoiceAgeTo name="age-to" onChange={this.filteredFriends.bind(this)}>
							{ageNumbers.map((item, index) => {
								return (
									<ChoiceAgeOption key={index} value={item}>
										to {item}
									</ChoiceAgeOption>
								);
							})}
						</ChoiceAgeTo>
					</ChoiceAge>
					<ChoiceSex ref={node => (this.choiceSex = node)}>
						<ChoiceSexLabel>
							<ChoiceSexRadio
								name="female"
								type="checkbox"
								onChange={this.filteredFriends.bind(this)}
								checked={this.state.female}
							/>
							<ChoiceSexText>Female</ChoiceSexText>
						</ChoiceSexLabel>
						<ChoiceSexLabel>
							<ChoiceSexRadio
								name="male"
								type="checkbox"
								onChange={this.filteredFriends.bind(this)}
								checked={this.state.male}
							/>
							<ChoiceSexText>Male</ChoiceSexText>
						</ChoiceSexLabel>
						<ChoiceSexLabel>
							<ChoiceSexRadio
								name="any"
								type="checkbox"
								onChange={this.filteredFriends.bind(this)}
								checked={this.state.any}
							/>
							<ChoiceSexText>Any</ChoiceSexText>
						</ChoiceSexLabel>
					</ChoiceSex>
				</ParametersSearchContainer>
			</FriendsSearchContainer>
		);
	}
}

const mapStateToProps = state => ({
	friends: state.Friends.data,
	flterFrinds: state.Friends.filterFriends
});

const mapDispatchToProps = dispatch => ({
	searchFriends: text => {
		dispatch(searchFriends(text));
	},
	dataFriends: () => {
		dispatch(fetchFriends());
	},
	filterMale: friends => {
		dispatch(filterFriendsMale(friends));
	},
	filterFemale: friends => {
		dispatch(filterFriendsFemale(friends));
	},
	filterAny: friends => {
		dispatch(filterFriendsAny(friends));
	},
	filterFrom: friends => {
		dispatch(filterFriendsAgeFrom(friends));
	},
	filterTo: friends => {
		dispatch(filterFriendsAgeTo(friends))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FriendsSearch);
