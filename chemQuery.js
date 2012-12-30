(function( window ){

//local copy of chemQuery
    var chemQuery = {};
    var c$ = chemQuery;

//constants
    var MOLE = 6.02214e+23;
    var periodic_table = [
        {
            element: 'hydrogen',
            symbol: 'H',
            atomic_number: 1,
            atomic_mass: 1.008,
            group: 1
        },
        {
            element: 'helium',
            symbol: 'He',
            atomic_number: 2,
            atomic_mass: 4.003,
            group: 18
        },
        {
            element: 'lithium',
            symbol: 'Li',
            atomic_number: 3,
            atomic_mass: 6.941,
            group: 1
        },
        {
            element: 'beryllium',
            symbol: 'Be',
            atomic_number: 4,
            atomic_mass: 9.012,
            group: 2
        },
        {
            element: 'boron',
            symbol: 'B',
            atomic_number: 5,
            atomic_mass: 10.81,
            group: 13
        },
        {
            element: 'carbon',
            symbol: 'C',
            atomic_number: 6,
            atomic_mass: 12.01,
            group: 14
        },
        {
            element: 'nitrogen',
            symbol: 'N',
            atomic_number: 7,
            atomic_mass: 14.01,
            group: 15
        }

    ];

//Element Constructor
    var Element = function(element){
        //if nuetrons are given as option then the appropriate isotope is created
        //otherwise a random isotope is generated based upon percent occurrence on earth.

        var initialize = function(element){

            var elementFromTable;
            var i = 0;
            var len = periodic_table.length;

            if(typeof element != 'string'){
                throw "Element argument must be a string";
            }


            for(i; i < len; i++){

                if(periodic_table[i].symbol == element){
                    elementFromTable = periodic_table[i];
                    i = len;
                }else if(periodic_table[i].element == element){
                    elementFromTable = periodic_table[i];
                    i = len;
                }
            }

            if(!elementFromTable){
                throw "Element " + element + " not found in periodic table";
            }else{
                for(prop in elementFromTable){
                    this[prop] = elementFromTable[prop];
                }
            }

            return this;

        };

        initialize.apply( this, [element]);

    };

    //Utilities
    var printPeriodicTable = function(){

        var prop;
        var periodicTable = $('<table></table>').addClass('periodic-table');
            periodicTable.append('<tr></tr>');

        for(prop in periodic_table){

            var element = periodic_table[prop];
            var atomicNumber = element.atomic_number;
            var symbol = element.symbol;
            var weight = element.atomic_mass;
            var td = $('<td></td>');
                td.append('<p class="atomic-number">' + atomicNumber + '</p>');
                td.append('<p class="symbol">' + symbol + '</p>');
                td.append('<p class="atomi-mass">' + weight + '</p>');

            periodicTable.append(td);

        }

        return periodicTable;
    };

//stoichometric utilities
    var atomsFromGrams = function(element, grams){
        //divide by atomic mass and multiple by avogadros number;
        var moles = grams/element.atomic_mass;
        var atoms;
        try{
            return moles * MOLE;
        }catch(e){
            throw "Too many atoms for javascript to calculate";
        }

    };

    var gramsFromAtoms = function(element, atoms){
        var moles = atoms/MOLE;
        return moles * element.atomic_mass;
    };

    c$['createElement'] = function(element){
        var normalizedElement = element.toLowerCase();
        return new Element(normalizedElement);
    };

    c$['atomsFromGrams'] = atomsFromGrams;
    c$['gramsFromAtoms'] = gramsFromAtoms;
    c$['periodicTable'] = periodic_table;
    c$['printPeriodicTable'] = printPeriodicTable;

    var carbon = new Element('hydrogen');
    console.info(carbon);




// Expose chemQuery to the global object
    window.chemQuery = window.c$ = chemQuery;

})( window );