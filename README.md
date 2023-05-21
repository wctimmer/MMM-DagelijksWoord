# MMM-DagelijksWoord
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It will display the verse of the day from [www.dagelijkswoord.nl](www.dagelijkswoord.nl). You can change the translation of the verse in the config file. 

## Language and credits
This module is inspired by and based on the module [MMM-DailyBibleVerse](https://github.com/arthurgarzajr/MMM-DailyBibleVerse/blob/master/README.md) by [arthurgarzajr](https://github.com/arthurgarzajr). The module shows only dutch verses. For other languages than dutch use MMM-DailyBibleVerse. on the first non-Sunday between Christmas and the New Year, the module displays additional text requesting donations for [www.dagelijkswoord.nl](www.dagelijkswoord.nl).

## Screenshot
![Screenshot](/images/screenshot.png)

## Installation
1. Navigate into your MagicMirror's `modules` folder 
2. Execute `git clone https://github.com/wctimmer/MMM-DagelijksWoord.git`


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-DagelijksWoord',
		position: 'bottom_bar',	// This can be any of the regions. Best result is in the bottom_bar as verses can take multiple lines in a day.
		config: {
			version: 'nbg21', // This can be changed to any translation you want
            username: '***@***.***', //emailadress known by www.dagelijkswoord.nl
            password: '***'  //key received from www.dagelijkswoord.nl
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>translation</code></td>
			<td>
                <ul>
                    <li><code>nbv</code> Nieuwe Bijbelvertaling</li>
                    <li><code>nbg</code> NBG51</li>
                    <li><code>statenvertaling</code> Statenvertaling</li>
                    <li><code>willibrord</code> Willibrord</li>
                    <li><code>hsv</code> Herziene Statenvertaling</li>
                    <li><code>naardense</code> Naardense Bijbel</li>
                    <li><code>bgt</code> Bijbel in Gewone Taal</li>
                    <li><code>nbg21</code> NBV21 <strong>default</strong></li>
                    <li><code>bb</code> BasisBijbel</li>
                </ul>
            </td>
		</tr>
		<tr>
			<td><code>username</code></td>
			<td>Username for authentication</td>
		</tr>
        <tr>
			<td><code>password</code></td>
			<td>Password/API key for authentication. Request your own on: [Dagelijks Woord](https://www.dagelijkswoord.nl/verspreiden/json-feed)</td>
		</tr>
	</tbody>
</table>

## Dependencies
- Access to the internet to download verse of the day from [www.dagelijkswoord.nl](www.dagelijkswoord.nl).
- npm package `request`

The MIT License (MIT)
=====================

Copyright © 2023 Wim Timmer

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
