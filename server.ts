import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Create MCP server instance

const server = new McpServer({
  name: "Weather Data Fetcher",
  version: "1.0.0",
});

// Define a tool
server.tool(
  // Name of the tool
  "trackPackage",
  // Short description of what this tool does
  "Track delivery status using tracking number",
  //  Define the input schema using Zod
  {
    trackingNumber: z.string().describe("Package tracking number"),
  },
  // Define the async function that will run when the tool is called
  async ({ trackingNumber }) => {
    // You could connect to a real API here, but for now we're just simulating it
    return {
      content: [
        {
          type: "text",
          text: `Checking delivery status for: ${trackingNumber}`,
        },
      ],
    };
  },
);

// A helper function to simulate fetching weather data

async function getWeatherByCity(city: string) {
  if (city.toLowerCase() === "new york") {
    return { temp: "22°C", forecast: "Partly cloudy with a breeze" };
  }
  if (city.toLowerCase() === "london") {
    return { temp: "16°C", forecast: "Rainy and overcast" };
  }
  return { temp: null, error: "Weather data not available for this city" };
}

// 🧠 Challenge:
// Create a tool called `getWeatherDataByCityName`
// It should take a city (New York or London) and return mock weather data as JSON text
// Use a helper like getWeatherByCity() to return the data
server.tool(
  "getWeatherByCityName",
  "Take a city and return the weather data for that city",
  {
    city: z.string().describe("City, for eg. London or New York"),
  },
  async ({ city }) => {
    const weather = await getWeatherByCity(city);

    return {
      content: [{ type: "text", text: JSON.stringify(weather) }],
    };
  },
);

// Registering a static resource on the MCP server
server.resource(
  // Resource name: internal name used to identify the resource
  "airports",

  // Resource URI: unique identifier for this resource
  "flights://airports",

  // Resource metadata: describes the resource
  {
    // Human-readable description of what the resource contains
    description: "List of supported airport codes",

    // MIME type: describes the format of the resource content
    mimeType: "text/plain",
  },

  // Read callback: executed when the client requests this resource
  async (uri) => {
    return {
      // Contents: the actual data returned by the resource
      contents: [
        {
          // URI of the resource being returned
          uri: uri.href,

          // MIME type of the returned content
          mimeType: "text/plain",

          // Actual resource content
          text: `Supported Airports:
            - JFK (New York)
            - LHR (London Heathrow)
            - SFO (San Francisco)`,
        },
      ],
    };
  },
);

/**
 *  Challenge: Create a static resource for the weather tool
 * - Use URI: weather://cities
 * - Return a plain text list of supported cities (e.g., London and New York)
 * - Set content type to 'text/plain'
 */
server.resource(
  "weather",
  "weather://cities",
  {
    description:
      "Return a plain text list of supported cities (e.g., London and New York)",
    mimeType: "text/plain",
  },
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: `Supported Cities:
            - New York (USA)
            - London (UK)
        `,
        },
      ],
    };
  },
);
