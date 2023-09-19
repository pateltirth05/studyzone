import React from 'react'
import { useState,useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../firebase";
import Head from './Head';
import Footer from './Footer';
function User() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const usersCollection = collection(db, 'users'); // Change 'users' to your collection name
            const usersSnapshot = await getDocs(usersCollection);
    
            const usersData = [];
            usersSnapshot.forEach(doc => {
              usersData.push({ id: doc.id, ...doc.data() });
            });
    
            setUsers(usersData);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
       
    
        fetchUsers();
        
      }, []);
  return (
   
    <div>
       
<Head/>

        <section class="container text-center" style={{maxWidth:400}}>
        <div class="row ">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-12 ">
       <main class="main-content-wrapper">
        <div class="container">
          <div class="row ">
            <div class="col-md-12">
              <div class="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Users</h2>
                    {/* <!-- breacrumb --> */}
                    
                </div>
               
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-xl-12 col-12 mb-5">
              <div class="card h-100 card-lg">

                <div class="card-body p-0 ">

                  <div class="table-responsive">
                    <table
                      class="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                      <thead class="bg-light">
                        <tr>
                          
                          <th>Id</th>
                          <th>Name</th>
                          
                        
                          

                          
                        </tr>
                      </thead>
                      <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          

                          <td>
                            <div class="d-flex align-items-center">
                              
                              <div class="ms-2">
                                {user.id}
                              </div>
                            </div>
                          </td>
                          <td>{user.name}</td>

                          
                         
                          

                          
                        </tr>
                        
            
              
            
           
          ))}
                        
                        
                        
                       
                      </tbody>
                    </table>

                  </div>

                 
                </div>

              </div>

            </div>
          </div>
          </div>
      </main>
    </div>
    </div>
   </section>
  <Footer/>
    </div>
    
  )
}

export default User
