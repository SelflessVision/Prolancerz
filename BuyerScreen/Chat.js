




import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Modal, TextInput, FlatList } from 'react-native';
import { Button, Alert } from 'react-native';
import { doc_id } from '../SellerScreen/UUID';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { ActivityIndicator } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from '@react-navigation/native';
import LoginBtn from '../Components/Loginbtn';
import MilestoneModal from './Meliston';
import { ProgressBar, Colors } from 'react-native-paper';
function Chat() {
    let navigation = useNavigation()
    const [focusedTab, setFocusedTab] = useState('Dashboard');
    const [milestoneDetails, setMilestoneDetails] = useState('');
    const [milestonePercentage, setMilestonePercentage] = useState('');
    const [loader, setloader] = useState(false)
    const [Mainloader, setMainloader] = useState(true)
    const [Jobs, SetJobs] = useState([])
    const [Percentage, SetPercentage] = useState(0)

    let route = useRoute()
    const [isModalVisible, setModalVisible] = useState(false);
    const collectionRef = collection(firestore, 'projectstatus');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    // const handleSave = milestoneData => {
    //     console.log('Milestone Data:', milestoneData);
    //     closeModal();
    //   };


    const { status, owner_email, project_id, user_id } = route.params
    const UploadPost = () => {
        // onClose()
        if (milestonePercentage>100-Percentage) {
            Alert.alert("Wrong",`You can add Only This ${100-Percentage}`)
            closeModal()

            return;
        }
        const document_id = doc_id()
        const userdocumentref = doc(collectionRef, document_id)

        const Data = {
            "doc_id": document_id,
            "project_id": project_id,

            "Milestone": milestoneDetails,
            "MilestonePercentage": milestonePercentage,
            "Milestone_Status": "pending",
        }
        setloader(true)
        setDoc(userdocumentref, Data).then(() => {
            Alert.alert("Post Success", "Task Are Uploaded")
            setloader(false)
            setMilestoneDetails("")
            setMilestonePercentage(0)
            closeModal()
            //   navigation.goBack();
            BidUploaded();
            // onClose();
        }).catch((err) => {
            setloader(false)
            console.log(err);
            //   Alert.alert("Opps", "Something went wrong")

        })


    }


    const BidUploaded = () => {
        setMainloader(true)

        const usersRef = collection(firestore, 'projectstatus');
        const q = query(usersRef,
            where('project_id', '==', project_id)
        );
        getDocs(q).then((querySnapshot) => {
            console.log(querySnapshot.docs.length);
            let temp = []
            let percentage = 0
            querySnapshot.forEach((data) => {
                console.log(data.id);
                // console.log(data.data()["MilestonePercentage"]);
                if (data.data()["Milestone_Status"] === "Done") {
                    

                    percentage = percentage + parseInt(data.data()["MilestonePercentage"])
                }else if(data.data()["Milestone_Status"] === "UnDone"){
                    percentage = percentage - parseInt(data.data()["MilestonePercentage"]);
                }
                temp.push(data.data())
            })
            SetJobs(temp)
            console.log("Total Percentage is :" + percentage);
            if(percentage>=0){
                SetPercentage(percentage)
            }else{
            SetPercentage(0)
            }
            //   settempJobs(temp)
            setMainloader(false)
            //   console.log(temp);

        }).catch(() => {
            setMainloader(false)
            Alert.alert("Opps", "Something went wrong")

        })

    }
    useEffect(() => {
        navigation.addListener("focus", () => {

            BidUploaded()
        })
    }, [])
    // const GetStatus=(item)=>{
    //     console.log(item.Milestone_Status);
    //     console.log(item.MilestonePercentage);
    //     // SetPercentage(Percentage+item.MilestonePercentage)

    // }


    return (
        <>
            <View
                style={{
                    flex: 1,
                    // alignItems:"center",
                    backgroundColor: "white",
                }}
            >
                {Mainloader ?


                    <ActivityIndicator size={"large"} />

                    :


                    <>

                        <View
                            style={{
                                width: "95%",
                                height: 30,
                                marginLeft: 5
                            }}
                        >


                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Entypo name="chevron-thin-left" size={30} />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style=
                            {{
                                fontSize: 20,
                                fontWeight: "bold",
                                alignSelf: "center",
                                color: "#000000"
                            }}
                        >

                            Status
                        </Text>
                        {/* <View  style={{width:"90%",height:"20%"}}> */}

                        {/* </View> */}

                        <View
                            style={{
                                width: '90%',
                                alignSelf: 'center',
                                marginBottom: 10,
                                height:  "70%"
                            }}>
                            <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ width: "90%" }}>

                                    <ProgressBar progress={Percentage / 100} color="#49B5F2" />
                                </View>
                                <Text>{Percentage}%</Text>
                            </View>

                            <FlatList
                                data={Jobs}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {

                                    //   GetStatus(item)

                                    return (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("StatusDetail", {
                                                    Tasktitle: item.Milestone,
                                                    Task_id: item.doc_id
                                                })}

                                            >

                                                <View
                                                    style={{
                                                        width: '100%',
                                                        marginBottom: 10
                                                        ,
                                                        backgroundColor: '#F1F1F1',
                                                        borderRadius: 10,
                                                        marginTop: 10,
                                                        padding: 20,



                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontSize: 17,
                                                            color: '#000000',
                                                            // fontWeight: 'bold',
                                                        }}>
                                                        {item.Milestone}
                                                    </Text>





                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ left: 10 }}>
                                                <Text>Task Status:{item.Milestone_Status}</Text>

                                            </View>
                                            {/* <Text></Text> */}
                                        </>

                                    )
                                }}
                            />
                        </View>

                        {status ?



                            <TouchableOpacity style={{ height: 50, alignItems: "center" }}

                                onPress={openModal}
                            >

                                <LoginBtn
                                    color="#003399"
                                    textcolor="#fff"
                                    textfontsize={23}
                                    name="Add MileStone"


                                />

                            </TouchableOpacity> : null

                        }





                        {/* <MilestoneModal isVisible={isModalVisible} onClose={closeModal} onSave={handleSave} ProjectId={project_id} /> */}



                    </>}


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 10,
                        // postion:"absoulte",
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: '#ffffff', // Customize tab bar background color
                    }}
                >
                    <TouchableOpacity

                        onPress={() => navigation.navigate('Tasklist', {
                            status: status,
                            owner_email: owner_email,
                            project_id: project_id,
                            user_id: user_id

                        })}


                        style={{ alignItems: 'center' }}>
                        <Ionicons
                            name={focusedTab === 'Dashboard' ? 'ios-list' : 'ios-list'}
                            size={24}
                            color={focusedTab === 'Dashboard' ? '#000000' : '#000000'}
                        />
                        <Text style={{ color: focusedTab === 'Dashboard' ? '#000000' : '#000000' }}>Tasklist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                        // onPress={() => {

                        //     navigation.navigate("Chat")
                        // }}
                        onPress={() => navigation.navigate('Chat', {
                            status: status,
                            owner_email: owner_email,
                            project_id: project_id,
                            user_id: user_id

                        })}

                        style={{ alignItems: 'center' }}>
                        <Ionicons
                            name={focusedTab === 'BuyerChat' ? 'chatbubble' : 'chatbubble'}
                            size={24}
                            color={focusedTab === 'BuyerChat' ? '#000000' : '#000000'}
                        />
                        <Text style={{ color: focusedTab === 'BuyerChat' ? '#000000' : '#000000' }}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => navigation.navigate('FileUpload', {
                            status: status,
                            owner_email: owner_email,
                            project_id: project_id,
                            user_id: user_id

                        })}

                        style={{ alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name={focusedTab === 'FileUpload' ? 'file-upload' : 'file-upload'}
                            size={24}
                            color={focusedTab === 'FileUpload' ? '#000000' : '#000000'}
                        />
                        <Text style={{ color: focusedTab === 'FileUpload' ? '#000000' : '#000000' }}>Files</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {isModalVisible ?
                <Modal isVisible={isModalVisible} transparent >
                    <View style={{
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
                            width: "90%",
                            height: 350,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            justifyContent: "center",
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}>
                            {loader ?

                                <ActivityIndicator size={"large"} />
                                :
                                <>
                                    <Text style={{ marginBottom: 30 }}>Enter Milestone Details:</Text>

                                    <TextInput
                                        value={milestoneDetails}
                                        onChangeText={text => setMilestoneDetails(text)}
                                        placeholder="Milestone Details"
                                        style={{ borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 10, width: "80%" }}
                                    />

                                    <Text style={{ marginBottom: 20 }}>Milestone Percentage:
                                        <Text
                                            style={{ color: "red" }}
                                        >You Can add only {100-Percentage}

                                        </Text>

                                    </Text>
                                    <TextInput
                                        value={milestonePercentage}
                                        onChangeText={text => setMilestonePercentage(text)}
                                        placeholder="Milestone Percentage"
                                        keyboardType="numeric"
                                        style={{ borderWidth: 1, padding: 10, borderRadius: 10, marginBottom: 10, width: "80%" }}

                                    />
                                    <View style={{ width: "90%", marginTop: 18 }}>

                                        <Button title="Save Details" onPress={UploadPost} color={"#003399"} />
                                    </View>
                                </>

                            }
                        </View>

                    </View>
                </Modal> : null

            }
        </>

    );
}

export default Chat;