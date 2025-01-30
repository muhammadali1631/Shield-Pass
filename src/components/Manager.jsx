import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!', {theme: "dark"});
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };
  const savePassword = () => {
    if(form.site === "" || form.username === "" || form.password === ""){
      toast.error('Please fill all the fields!', {theme: "dark"});
    }else{
      setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      setForm({ site: "", username: "", password: "" });
      toast.success('Password saved!', {theme: "dark"});
    }
  };
  const deletePassword = (id) => {
    const c = confirm("Are you sure you want to delete this password?");
    if(c){
    toast.success('Password deleted!', {theme: "dark"});

      const filteredPasswords = passwordArray.filter((password) => password.id !== id);
      setPasswordArray(filteredPasswords);
      localStorage.setItem("passwords", JSON.stringify(filteredPasswords));
    }


  };
  const editPassword = (id) => {
    const filteredForm = passwordArray.filter((password) => password.id === id);
    setForm(filteredForm[0]);
    const filteredPasswords = passwordArray.filter((password) => password.id !== id);
    setPasswordArray(filteredPasswords);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
          {" "}
        </div>
      </div>
      <div className="p-2 md:container md:mx-auto md:px-40 min-h-[83vh] ">
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-slate-500"> &lt;</span>
          Shield
          <span className="text-slate-500">Pass / &gt;</span>
        </h1>
        <p className="text-lg text-slate-600 text-center">
          Your own password manager
        </p>
        <div className="flex flex-col text-black p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-white w-full px-4 py-1 bg-gray-200"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username/Email"
              className="rounded-full border border-white w-full px-4 py-1 bg-gray-200"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-white bg-gray-200 w-full px-4 py-1  "
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={26}
                  className="p-1"
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            className="flex gap-2 cursor-pointer justify-center items-center bg-slate-400  rounded-full px-6 py-1 w-fit "
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords overflow-x-scroll mb-4">
          <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>Password not found</div>
          ) : (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-1 py-2">Site</th>
                  <th className="px-1 py-2">Username</th>
                  <th className="px-1 py-2">Password</th>
                  <th className="px-1 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-300">
                {passwordArray.map((password, index) => (
                  <tr key={index}>
                    <td className="border border-white py-2 text-center">
                      <div className="flex justify-center items-center">
                        <a href={password.site} target="_blank">
                          {password.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(password.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "5px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center ">
                      <div className="flex justify-center items-center">
                        <span>{password.username}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(password.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "5px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <div className="flex justify-center items-center">
                        <span>{password.password}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(password.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "5px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <span className="cursor-pointer mx-1" onClick={() => editPassword(password.id)}>
                      <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              
                            }}
                          ></lord-icon>
                      </span>
                      <span className="cursor-pointer mx-1" onClick={() => deletePassword(password.id)}>
                      <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              
                            }}
                          ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
