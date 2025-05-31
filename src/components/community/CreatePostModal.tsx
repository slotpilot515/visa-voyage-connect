// src/components/community/CreatePostModal.tsx
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const countries = ["India", "USA", "Canada", "UK", "Germany"];
const indiaStates = ["Telangana", "Chennai", "Mumbai", "Kolkata", "Delhi"];
const visaTypes = ["F1","F2","H1B","H4", "B1", "B2", "L1",];
const statuses = ["Approved", "Rejected"];

const CreatePostModal = ({ isOpen, onClose, type }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [fromState, setFromState] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [visaType, setVisaType] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [airline, setAirline] = useState("");
  const [pnr, setPnr] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name,
      title,
      content,
      type,
      createdAt: serverTimestamp(),
    };

    if (type === "experience") {
      payload.fromCountry = fromCountry;
      payload.fromState = fromState;
      payload.toCountry = toCountry;
      payload.visaType = visaType;
      payload.status = status;
      payload.appointmentDate = appointmentDate;
      payload.appointmentTime = appointmentTime;
    }

    if (type === "companion") {
      payload.flightDetails = { from: flightFrom, to: flightTo, airline, pnr };
    }

    try {
      await addDoc(collection(db, "posts"), payload);
      onClose();
      setName(""); setTitle(""); setContent(""); setFromCountry(""); setFromState("");
      setToCountry(""); setVisaType(""); setStatus(""); setAppointmentDate(""); setAppointmentTime("");
      setFlightFrom(""); setFlightTo(""); setAirline(""); setPnr("");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a {type} Post</DialogTitle>
        </DialogHeader>

        <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Your Story..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" />

        {type === "experience" && (
          <>
            <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="w-full p-2 border rounded">
              <option>Select From Country</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            {fromCountry === "India" && (
              <select value={fromState} onChange={(e) => setFromState(e.target.value)} className="w-full p-2 border rounded">
                <option>Select State</option>
                {indiaStates.map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
            <select value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="w-full p-2 border rounded">
              <option>Select Visa To Country</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="w-full p-2 border rounded">
              <option>Select Visa Type</option>
              {visaTypes.map((v) => <option key={v}>{v}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded">
              <option>Select Status</option>
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            <Input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            <Input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
          </>
        )}

        {type === "companion" && (
          <>
            <Input placeholder="From" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} />
            <Input placeholder="To" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} />
            <Input placeholder="Airline" value={airline} onChange={(e) => setAirline(e.target.value)} />
            <Input placeholder="PNR" value={pnr} onChange={(e) => setPnr(e.target.value)} />
          </>
        )}

        <Button onClick={handleSubmit} className="mt-4 w-full">Post</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;