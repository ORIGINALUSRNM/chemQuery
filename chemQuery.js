(function( window ){

//local copy of chemQuery
    var chemQuery = {};

//constants
    var MOLE = 6.02214e+23;

//Element Constructor
    var Element = function(options){
        //if nuetrons are given as option then the appropriate isotope is created
        //otherwise a random isotope is generated based upon percent occurrence on earth.
        this.name = options.name || 'unknown';

        if(typeof options.protons == 'Number' && options.protons){

        }
        this.protons = options.protons || 'unknown';

    };


// Expose chemQuery to the global object
    window.chemQuery = window.c$ = chemQuery;

})( window );