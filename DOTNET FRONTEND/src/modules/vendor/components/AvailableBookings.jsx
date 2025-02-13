// import { useState, useEffect } from 'react';
// import { Table, Button, Form, InputGroup } from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';
// import { useAuth } from '../../../context/AuthContext';
// import axios from 'axios';



// function AvailableBookings({ onViewDetails, onAcceptBooking }) {
//   const [bookings, setBookings] = useState([]);
//   //const[profileVendor,setProfile]=useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);


//   // useEffect(() => {
//   //   const storedProfile = localStorage.getItem('vendorData');
//   //   console.log("in profile of localstorage", storedProfile);
//   //   if (storedProfile) {
//   //     setProfile(JSON.parse(storedProfile));
//   //   }
//   // }, []);

//   const { user } = useAuth();
//   useEffect(() => {
//     fetchAvailableBookings();
//     console.log("in fetchavalable useeffect");
    
//   }, []);

//   console.log("in vedor dashboard to check user updated auth",user.city);
//   // useEffect(() => {
//   //   const storedProfile = localStorage.getItem('vendorData');
//   //   console.log("in profile of localstorage", storedProfile);
//   //   if (storedProfile) {
//   //     setProfile(JSON.parse(storedProfile));
//   //   }
//   //   fetchAvailableBookings();
//   // }, []);

  
 
//   const fetchAvailableBookings = async () => {
//     try {
//       console.log("in user city ",user.city);
//       const response = await axios.get(`http://localhost:8080/bookings/city-status?city=${user.city}&status=CONFIRMED`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setBookings(response.data);
//     } catch (error) {
//       console.error('Error fetching available bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const filteredBookings = bookings.filter(booking =>
//     booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="mb-4">
//         <InputGroup>
//           <Form.Control
//             placeholder="Search bookings..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <InputGroup.Text>
//             <FaSearch />
//           </InputGroup.Text>
//         </InputGroup>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Booking ID</th>
//             <th>Pickup Address</th>
//             <th>Delivery Address</th>
//             <th>Date</th>
//             <th>City</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBookings.length === 0 ? (
//             <tr>
//               <td colSpan="6" className="text-center">No available bookings found</td>
//             </tr>
//           ) : (
//             filteredBookings.map(booking => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.pickupLocation}</td>
//                 <td>{booking.dropLocation}</td>
//                 <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
//                 <td>{booking.city}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <Button
//                       variant="info"
//                       size="sm"
//                       onClick={() => onViewDetails(booking)}
//                     >
//                       View
//                     </Button>
//                     <Button
//                       variant="success"
//                       size="sm"
//                       onClick={() => onAcceptBooking(booking.id)}
//                     >
//                       Accept
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AvailableBookings;



import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

function AvailableBookings({ onViewDetails, onAcceptBooking }) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterDays, setFilterDays] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchAvailableBookings();
  }, []);

  const fetchAvailableBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5205/api/Booking/city/${user.city}/status/CONFIRMED`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("response of available bookings in vendor paneel",response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching available bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearchTerm = booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilterDays = filterDays ? new Date(booking.moveDate) <= new Date(Date.now() + filterDays * 24 * 60 * 60 * 1000) : true;
      return matchesSearchTerm && matchesFilterDays;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.cost - b.cost;
      } else if (sortOrder === 'desc') {
        return b.cost - a.cost;
      }
      return 0;
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <InputGroup className="w-50">
          <Form.Control
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
        <Dropdown onSelect={(e) => setFilterDays(Number(e))}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Filter by Days
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="3">Next 3 Days</Dropdown.Item>
            <Dropdown.Item eventKey="5">Next 5 Days</Dropdown.Item>
            <Dropdown.Item eventKey="10">Next 10 Days</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown onSelect={(e) => setSortOrder(e)}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Sort by Price
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Pickup Address</th>
            <th>Delivery Address</th>
            <th>Date</th>
            <th>City</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No available bookings found</td>
            </tr>
          ) : (
            filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.dropLocation}</td>
                <td>{new Date(booking.moveDate).toLocaleDateString()}</td>
                <td>{booking.city}</td>
                <td>{booking.cost}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => onViewDetails(booking)}
                    >
                      View
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onAcceptBooking(booking.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AvailableBookings;

