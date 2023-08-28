import React, { useState } from 'react';
import { View, Text, TextInput, Button ,Modal, Alert} from 'react-native';
import { doc_id } from '../SellerScreen/UUID';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { ActivityIndicator } from 'react-native-paper';

const MilestoneModal = ({ isVisible, project_id,onClose, onSave }) => {
  const [milestoneDetails, setMilestoneDetails] = useState('');
  const [milestonePercentage, setMilestonePercentage] = useState('');
  const [loader,setloader]=useState(false)
console.log("This is Melistone Project Id:"+project_id);
  const handleSave = () => {
    // Perform any validation you need here
    if (milestoneDetails && milestonePercentage) {
      onSave({
        details: milestoneDetails,
        percentage: milestonePercentage,
      });
      setMilestoneDetails('');
      setMilestonePercentage('');
    }
  };
  const collectionRef = collection(firestore, 'projectstatus');

  const UploadPost = () => {
    onClose()
    // const document_id = doc_id()
    // const userdocumentref = doc(collectionRef, document_id)

    // const Data = {
    //   "doc_id": document_id,
    //   "project_id": project_id,

    //   "Milestone": milestoneDetails,
    //   "MilestonePercentage": milestonePercentage,
    //   "Milestone_Status": "pending",
    // }
    // setloader(true)
    // setDoc(userdocumentref, Data).then(() => {
    //   Alert.alert("Post Success", "Task Are Uploaded")
    //   setloader(false)
    // //   navigation.goBack();
    // onClose();
    // }).catch(() => {
    //   setloader(false)
    //   Alert.alert("Opps", "Something went wrong")

    // })


  }

  return (
    <Modal isVisible={isVisible} transparent onBackdropPress={onClose}>
        <View  style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
        }}>

      <View style={{
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    width:"90%",
    height:"50%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent:"center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, }}>
   { loader?
   
   <ActivityIndicator size={"large"} />
   :   
   <>
   <Text  style={{marginBottom:30}}>Enter Milestone Details:</Text>

        <TextInput
          value={milestoneDetails}
          onChangeText={text => setMilestoneDetails(text)}
          placeholder="Milestone Details"
          style={{ borderWidth: 1, padding: 10,borderRadius:10, marginBottom: 10 ,width:"80%"}}
        />

        <Text  style={{marginBottom:20}}>Milestone Percentage:
            <Text
            style={{color:"red"}}
            >You Can add only 100%

            </Text>

        </Text>
        <TextInput
          value={milestonePercentage}
          onChangeText={text => setMilestonePercentage(text)}
          placeholder="Milestone Percentage"
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10,borderRadius:10, marginBottom: 10 ,width:"80%"}}

        />
<View  style={{width:"90%",marginTop:18}}>

        <Button   title="Save Details" onPress={UploadPost} color={"#003399"}/>
</View>
</>

}
      </View>

      </View>
    </Modal>
  );
};

export default MilestoneModal;
