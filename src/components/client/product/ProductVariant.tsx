import {Box, Button} from "@mui/material";
import {FlexBox} from "../flex-box";
import {H6} from "../Typography";
import {useEffect, useState} from "react";

// ===========================================================
const ProductVariant = ({handleCb,attribute,group,reset = false}) => {
  const [selectedVariant, setSelectedVariant] = useState({});
  useEffect(() => {
      handleCb(selectedVariant);
  }, [selectedVariant]);
  
  const ActiveVariant = (att,exist) => {
    let coppySelected = selectedVariant;
    if (exist === true){ // delete
      const cloneObj = {...selectedVariant};
      delete cloneObj[att.attribute_group_id]; // or whichever key you want
      setSelectedVariant(cloneObj);
    }else{ // add, change
      if (att.child_list === null){// check if not has child
        const id_list_expand = [];
        attribute.forEach((item) => { // find list parent is have expand
          if (item.hasOwnProperty('expand') && item['expand'] === true){
            id_list_expand.push(item.parent);
          }
        })
        const id_list_parent = [];
        attribute.forEach((item) => { // check if same kind att group
          if (id_list_expand.includes(item.id)){
            if (item.attribute_group_id === att.attribute_group_id){
              id_list_parent.push(item.id);
            }
          }
        })
        attribute.forEach((item) => { // then off expand
          if (id_list_parent.includes(item.parent)){
            if (item.hasOwnProperty('expand') && item['expand'] === true){
              item['expand'] = false;
              if (selectedVariant.hasOwnProperty(item.attribute_group_id)){
                delete coppySelected[item.attribute_group_id]; // or whichever key you want
              }
            }
          }
        })
      }else{// check if has child
        const list_child = att.child_list.split(',').map( Number );
        attribute.forEach((item) => {
          if (list_child.includes(item.id)){ // check exist show child
            item['expand'] = true;
          }else{
            if (item.hasOwnProperty('expand')){ // none exist hide
              item['expand'] = false;
              if (selectedVariant.hasOwnProperty(item.attribute_group_id)){
                delete coppySelected[item.attribute_group_id]; // or whichever key you want
              }
            }
          }
        })
      }
      const cloneObj = {};
      cloneObj[att.attribute_group_id] = att;
      setSelectedVariant({
        ...coppySelected,
        ...cloneObj
      })
    }
  }
  const renderSelection = (type,att) => {
    switch (type) {
      case "button":
        for (const fKey in selectedVariant) {
          if (selectedVariant[fKey].id === att.id){
            return <Button disabled={att.qty === 0} color="primary" onClick={() => ActiveVariant(att,true)} variant="contained">{att.name}</Button>;
          }
        }
        return <Button disabled={att.qty === 0} onClick={() => ActiveVariant(att,false)} variant="outlined">{att.name}</Button>;
      default:
        return null;
    }
  };
  return (
    group.map((item) => (
      <Box alignItems="center" mb={2} key={`p_${item.id}`}>
        <H6 mb={1}>{item.name}</H6>
        <FlexBox>
          { attribute.map((att) => parseInt(item.id) === parseInt(att.attribute_group_id) && att.parent === 0 ?
            (<Box mr={1} key={`c_${att.id}`}> { renderSelection(item.type,att) }</Box>) :
            (att.hasOwnProperty('expand') && att.expand === true && parseInt(item.id) === parseInt(att.attribute_group_id) ? (<Box mr={1} key={`c_${att.id}`}> { renderSelection(item.type,att) }</Box>) : null)
          ) }
        </FlexBox>
      </Box>
    ))
  );
};

export default ProductVariant;
