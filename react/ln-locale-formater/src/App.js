import './App.css';
import React, {Component} from 'react';

function FormatNumber({ locale="en-EN", number, style="decimal", currency="USD" }) {
	return (
		new Intl.NumberFormat(locale, {
		  maximumFractionDigits: 2,
		  minimumFractionDigits: 2,
		  style,
		  currency,
		}).format(number)
	);
  }

class App extends Component {

	constructor(props){
		super(props);
		console.log(props);
	}

	render(props) {
			return (
				<span>
					<FormatNumber
						number={this.props.number}
						locale={this.props.locale}
						style={this.props.style}
						currency={this.props.currency}
						></FormatNumber>
				</span>
			)
	}
}

export default App;

