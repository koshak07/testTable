import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchVendorCodes } from "../../http/vendorCodeApi";
import { observer } from "mobx-react-lite";
import { userContext } from "../../context/UserContext";

const options = [];

fetchVendorCodes().then((res) => {
  res.map((i) => options.push(i.name));
});

export const ControllableStates = observer(() => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const { nomenclature } = React.useContext(userContext);
  // console.log(value);
  // nomenclature.setSelectedVendorCode(value);

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          nomenclature.setSelectedVendorCode(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
    </div>
  );
});

// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CircularProgress from "@mui/material/CircularProgress";

// import { fetchVendorCodes } from "../../http/vendorCodeApi";
// import { observer } from "mobx-react-lite";

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

// export const Asynchronous = observer(() => {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const loading = open && options.length === 0;
//   const [vendorCode, setVendorCode] = React.useState();

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       await sleep(1e3); // For demo purposes.

//       if (active) {
//         setOptions([...topFilms]);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);
//   // console.log(vendorCode);
//   return (
//     <Autocomplete
//       id="asynchronous-demo"
//       sx={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       isOptionEqualToValue={(option, value) => option.name === value.name}
//       getOptionLabel={(option) => option.name}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Артикул"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// });

// const topFilms = [];
// fetchVendorCodes().then((res) => {
//   res.map((i) => topFilms.push(i));
// });
