import _ from "lodash";
const paginate = (data, pageSize, page ) => {
    
        const startIndex = (page-1)*pageSize;
        return _(data).slice(startIndex).take(pageSize).value();
      
}
 
export default paginate;