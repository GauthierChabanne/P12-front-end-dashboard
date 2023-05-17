// S E R V I C E / A P I //

//get user infos  //
export const getUser = async (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, requestOptions);
    const jsonRes = await response.json();
    return jsonRes.data;

  } catch {
    console.error();
    return [];
  }
};

// get activities infos //
export const getActivity = async (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/activity`, requestOptions);
    const jsonRes = await response.json();
    return jsonRes.data.sessions

  } catch {
    console.error();
    return [];
  }
};

// get averages infos //
export const getAverage = async (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`, requestOptions);
    const jsonRes = await response.json();
    return jsonRes.data.sessions;

  } catch {
    console.error();
    return [];
  }
};

// get Performances infos //
export const getPerformance = async (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}/performance`, requestOptions);
    const jsonRes = await response.json();
    return { value: jsonRes.data.data, kind: jsonRes.data.kind }

  } catch {
    console.error();
    return [];
  }
}
