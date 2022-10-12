import { reverse } from 'named-urls';
import _ from 'lodash';


class Pather {

    constructor(routes){

        const preparedRoutes = this.prepareRoutes(routes);

        for(const route in preparedRoutes){
            this[route] = preparedRoutes[route];
        }
    }

    prepareRoutes(routes){
        let result = {}
        for (const route in routes) {
            if(_.isObject(routes[route])){
                const current = routes[route];
                const path = current?.path; 
                const sub = current?.sub;
                if(!!path && !!sub){
                    for (const subRoute in sub){
                        result[route] = path;
                        if(_.isObject(sub[subRoute])){ 
                            const currentResult = this.prepareRoutes({[subRoute]: sub[subRoute]});
                            let tmp = {}
                            for(const item in currentResult){
                                tmp[item] = path + currentResult[item];
                            }
                            result = { ...result, ...tmp }
                        }
                        else {
                            result[subRoute] = path + sub[subRoute];
                        }
                    }
                }
            }
            else{
                result[route] = routes[route];
            }            
        }
        return result;
    }

    /**
     * Reverse given route
     * @method
     * @param {string} route - Route for reversing.
     * @param {object} params - Route params.
     */
    reverse(route, params){
        return reverse(route, params);
    }
}
 
export default Pather;