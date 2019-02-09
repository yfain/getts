import lib1 from './with-default-export';
import * as lib2 from './without-default-export'; // Enable allowSyntheticDefaultImports in the tsconfig.json
                                                  // to be able import lib2 the same way ad lib1 above.

lib1.log();
lib2.log();
