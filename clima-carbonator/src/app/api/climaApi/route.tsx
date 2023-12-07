import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
	let data;
	try {

		const req_data = await request.json();
		data = await fetch('http://localhost:8000/climaApi/predictEmission', {
			body: JSON.stringify(req_data),
			method: 'POST',

		}).then(res => res.json());
	}
	catch (exception) {
		console.log(exception);
		return Response.json({ dataFetch: false }, { status: 200 });
	}
	return Response.json({ dataFetch: true, data: data }, { status: 200 });
}