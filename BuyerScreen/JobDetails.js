import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { doc_id } from '../SellerScreen/UUID';
import { useSelector } from 'react-redux';

export default function JobDetail() {
    let navigation = useNavigation()
    let route = useRoute()
    const { JobDeta, Username, Skill, project_id ,project_email} = route.params;
    const collectionRef = collection(firestore, 'Bids');
    const [loader, setloader] = useState(false)
    let user_id = useSelector((state) => state.counter.user_id)
//   console.log(project_email);
    const [proposalText, setProposalText] = useState('');
    const Post = () => {
        const document_id = doc_id()
        const userdocumentref = doc(collectionRef, document_id)

        const Data = {
            "project_id": project_id,
            "bid_id": document_id,
            "user_id": user_id,
            "bid": proposalText,
            "purposal_status":"pending",
            "project_owner_email":project_email

        }
        setDoc(userdocumentref, Data).then(() => {
            Alert.alert("Post Success", "Bid Are Uploaded")
            setloader(false)
            navigation.goBack();
        }).catch(() => {
            setloader(false)
            Alert.alert("Opps", "Something went wrong")

        })
    }
    const BidUploaded = () => {
        setloader(true)

        const usersRef = collection(firestore, 'Bids');
        const q = query(usersRef,
            where('project_id', '==', project_id),
            where('user_id', '==', user_id)
        );
        getDocs(q).then((querySnapshot) => {
            if (querySnapshot.docs.length >= 1) {
                Alert.alert("Bid", "Purposal Already Submited")
                setloader(false)
            } else {
                Post();
            }
        }).catch(() => {
            setloader(false)
            Alert.alert("Opps", "Something went wrong")

        })

    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <View style={{ width: '95%', height: 30, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-thin-left" size={30} />
                </TouchableOpacity>
            </View>


            <View style={{ width: '90%', alignSelf: 'center' }}>
                <Text style={styles.heading}>Job Detail</Text>
                <View style={{ height: 30 }} />

                <Text style={styles.subText}>{Username}</Text>
                <View style={{ height: 10 }} />

                <Text style={styles.jobDetail}>{JobDeta}</Text>
                <View style={{ height: 20 }} />

                {/* <Text style={styles.skill}>{Skill}</Text> */}
                <View style={{ height: 30 }} />

                <Text style={styles.heading}>Write your Purposal</Text>
                <View style={styles.proposalTextContainer}>
                    <TextInput
                        style={styles.proposalText}
                        multiline={true}
                        numberOfLines={5}
                        placeholder="Write your proposal here..."
                        value={proposalText}
                        onChangeText={text => setProposalText(text)}
                    />
                </View>

                {/* navigation.navigate('Tasklist') */}
                <TouchableOpacity style={styles.dashboardButton} onPress={() => BidUploaded()}>
                    <Text style={styles.dashboardButtonText}>Apply</Text>

                </TouchableOpacity>

                
            </View>
            <Modal visible={loader} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={"large"} color={"black"} />
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#000000',
    },
    subText: {
        fontSize: 14,
        color: 'grey',
    },
    jobDetail: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#000000',
    },
    proposalTextContainer: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    proposalText: {
        fontSize: 16,
        color: '#000000',
        height: 70, // Set the height of the TextInput
    },
    skill: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },

    proposalText: {
        fontSize: 16,
        color: '#000000',
    },
    dashboardButton: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: "center",

        width: "50%",
        marginTop: 20,
        marginBottom: 20
    },
    dashboardButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});