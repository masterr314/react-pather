import _ from 'lodash';

class Pather {

    constructor(frontRoutes, backRoutes){
        const preparedFrontRoutes = this.prepareRoutes(frontRoutes);
        const preparedBackRoutes = this.prepareRoutes(backRoutes);        
        this['front'] = this.sectionize(preparedFrontRoutes, frontRoutes);
        this['back'] = this.sectionize(preparedBackRoutes, backRoutes);
    }

    /**
     * Prepare (resolve) routes
     * @method
     * @param {object} routes - Original (unprepared) routes.
     */
    prepareRoutes(routes){
        let result = {}
        for (const route in routes) {
            if(_.isObject(routes[route])){
                const current = routes[route];
                const path = current?.path; 
                const sub = current?.sub;
                if(!!path && !!sub){
                    result[route] = path;
                    for (const subRoute in sub){
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
     * Split all routes into seperate sections
     * @method
     * @param {object} preparedRoutes - Prepared routes.
     * @param {object} originalRoutes - Original (unprepared) routes.
     */
    sectionize(preparedRoutes, originalRoutes){
        let result = {};
        for (const originalRoute in originalRoutes) {
            if(_.isObject(originalRoutes[originalRoute])){
                const current = originalRoutes[originalRoute];
                const isSection = current?.isSection;
                const path = current?.path; 
                const sub = current?.sub;
                if(!!path && !!sub){
                    if (isSection) {
                        const currentSection = {};
                        const currentSectionName = _.startCase(originalRoute);
                        result[originalRoute] = preparedRoutes[originalRoute];
                        let tmp = {}
                        for (const subRoute in sub){
                            if(_.isObject(sub[subRoute])){ 
                                const currentResult = this.sectionize(preparedRoutes, {[subRoute]: sub[subRoute]});
                                tmp = currentResult;
                            }
                            else {
                                tmp[subRoute] = preparedRoutes[subRoute];
                            }
                        }
                        currentSection[currentSectionName] = tmp;
                        result = { ...result, ...currentSection }
                    }
                    else {
                        result[originalRoute] = preparedRoutes[originalRoute];
                        for (const subR in sub){
                            if(_.isObject(sub[subR])){ 
                                const currentRes = this.sectionize(preparedRoutes, {[subR]: sub[subR]});
                                result = { ...result, ...currentRes }
                            }
                            else {
                                result[subR] = preparedRoutes[subR];
                            }
                        }
                    }
                }
            }
            else {
                result[originalRoute] = preparedRoutes[originalRoute];
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
        const exp = /:[a-zA-Z_]{1}\w*/g;

        const interpolatedRoute = route.replace(exp, param => {
            const srcParam = param.slice(1);
            return params[srcParam] ? params[srcParam] : param;
        });

        return interpolatedRoute;
    }

    /**
     * Check whether given string is a valid URL 
     * @method
     * @param {string} str - String for checking.
     * @param {boolean} http - If `true` check whether string is a valid HTTP/HTTPS url.
     */
    isURLValid = (str, http = false) => {
        try {
            const newUrl = new URL(str);
            if (http) return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Performs filling of the `Pather` object with additional information.
     * @method
     */
    fill(){
        const location = window.location;
        this.location = location;
        this.current = location.pathname;
        this.query = new URLSearchParams(location.search);
    }
}

export default Pather;