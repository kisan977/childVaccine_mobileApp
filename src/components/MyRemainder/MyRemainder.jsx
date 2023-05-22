import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Table, Row, Cols, TableWrapper} from 'react-native-table-component';

export default function MyRemainder() {
  const [schedule, setSchedule] = useState([]);

  // Extract the table headers
  const tableHead = [
    'Date',
    'At Birth',
    '6 Weeks',
    '10 Weeks',
    '14 Weeks',
    '5 Months',
    '12 Months',
    '15 Months',
  ];
  // Extract the table title
  const tableTitle = ['Vaccine Name', 'Date', 'Dose'];

  const tableData = schedule.map(item =>
    item.vaccine.map(vaccine => [
      `${vaccine.vaccine_name}  ${vaccine.dose}  ${vaccine.date}`,
    ]),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the user from AsyncStorage
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);

        // Get the token from user.token.access
        const token = user.token.access;

        // Make the API request with the token
        const response = await axios.get(
          'http://10.0.2.2:8000/api/main/view-vaccine-schedule',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        // Handle the response
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.MyRemainderW}>
      <View style={styles.MyRemainderT}>
        <Text style={styles.MyRemainderTt}>
          Your Children Upcoming Vaccines Routines
        </Text>
      </View>

      <View style={styles.underline}></View>
      <ScrollView horizontal={true}>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Row
              data={tableTitle}
              style={styles.title}
              heightArr={[28, 28, 28]}
              textStyle={styles.textC}
            />
            {tableData.map((rowData, index) => (
              <Cols
                key={index}
                data={rowData}
                style={styles.row}
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        </Table>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  MyRemainderW: {
    flex: 1,
    backgroundColor: '#4A148C',
  },
  MyRemainderT: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
  },
  MyRemainderTt: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  underline: {
    height: 5,
    width: '90%',
    backgroundColor: '#FFCC00',
    marginLeft: 20,
    marginBottom: 10,
  },

  head: {backgroundColor: '#fff', padding: 10, borderWidth: 0},
  text: {marginLeft: 100, color: '#4A148C', fontWeight: 'bold', fontSize: 20},
  textC: {
    color: '#4A148C',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 90,
  },
  title: {backgroundColor: '#fff', padding: 20},
  wrapper: {flexDirection: 'row'},
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
