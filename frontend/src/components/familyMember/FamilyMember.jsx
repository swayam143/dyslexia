import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIURL, APIURL2 } from "../../utils/APIURL";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./familyMember.css";
import EditFamilyMember from "./EditFamilyMember";
import { GetFamilyMember } from "../../redux/childSlice";

const FamilyMember = () => {
  // const [familyMembers, setFamilyMembers] = useState([]);
  const ChildData = useSelector((state) => state.childData.childData);
  const [open, setOpen] = useState(false);
  const [memberData, setMemberData] = useState(null);
  const familyMembers = useSelector((state) => state.childData.familyMember);
  // console.log(familyMembers);

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const dispatch = useDispatch();

  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get(
        `${APIURL}/getUser/${ChildData.childId}`
      );
      if (response.status === 200) {
        // setFamilyMembers(response.data);
        dispatch({ type: GetFamilyMember, payload: response.data });
      }
    } catch (error) {
      toast.error("Failed to fetch family members");
    }
  };

  const handleEditMember = (memberId) => {
    // Implement your logic to handle editing a family member
    console.log(`Edit member with ID: ${memberId}`);
  };

  const Edit_User = (data) => {
    setMemberData(data);
    setOpen(true);
  };
  // console.log(memberData);

  return (
    <div className="container">
      <h2 className="my-3">Family Members</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Voice</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyMembers?.data?.map((member, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Avatar
                    alt={member.name}
                    src={`${APIURL2}uploads/${member.photo}`}
                  />
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.relation}</TableCell>
                <TableCell>
                  <audio controls>
                    <source
                      src={`${APIURL2}uploads/${member.voice}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => Edit_User(member)} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditFamilyMember open={open} setOpen={setOpen} memberData={memberData} />
    </div>
  );
};

export default FamilyMember;
