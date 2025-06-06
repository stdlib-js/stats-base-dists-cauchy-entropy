/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var entropy = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof entropy, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var v = entropy( NaN, 0.5 );
	t.equal( isnan( v ), true, 'returns expected value' );

	v = entropy( 10, NaN );
	t.equal( isnan( v ), true, 'returns expected value' );

	v = entropy( NaN, NaN );
	t.equal( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = entropy( 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = entropy( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = entropy( 0.0, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	y = entropy( PINF, NINF );
	t.equal( isnan( y ), true, 'returns expected value' );

	t.end();
});

tape( 'the function returns the differential entropy of a Cauchy distribution', function test( t ) {
	var expected;
	var gamma;
	var x0;
	var y;
	var i;

	expected = data.expected;
	x0 = data.x0;
	gamma = data.gamma;
	for ( i = 0; i < x0.length; i++ ) {
		y = entropy( x0[i], gamma[i] );
		t.equal( y, expected[i], 'x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
	}
	t.end();
});
