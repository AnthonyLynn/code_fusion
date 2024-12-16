import json
import pandas as pd
from datetime import time
import openrouteservice
from itertools import permutations

def coordinates(row):
    return (row['Longitude'], row['Latitude'])

def create_distance_matrix (start, sleigh_ride, hotel):
    coordinate_list = [coordinates(start)]
    for ride in sleigh_ride:
        location.append(coordinates(ride))
    location.append(coordinates(hotel))
    
    matrix = client.distance_matrix(
        locations = coordinate_list,
        profile = 'driving-car',
        metrics = ['distance']
    )
    return matrix['distances']

def find_optimal_route(start_idx, end_idx, distance_matrix):
    num_locations = len(distance_matrix)
    all_points = list(range(num_locations))

    # Intermediate points (excluding start and end)
    intermediate_points = [i for i in all_points if i != start_idx and i != end_idx]

    min_distance = float('inf')
    best_route = None

    # Generate all possible permutations of intermediate points
    for perm in permutations(intermediate_points):
        # Complete the route: start -> permuted points -> end
        route = [start_idx] + list(perm) + [end_idx]

        # Calculate the total distance for this route
        total_distance = sum(
            distance_matrix[route[i]][route[i + 1]] for i in range(len(route) - 1)
        )

        # Update minimum distance and best route if necessary
        if total_distance < min_distance:
            min_distance = total_distance
            best_route = route

    return best_route, min_distance
# Initialize the client with API key
client = openrouteservice.Client(key="5b3ce3597851110001cf6248ae3b610c01274cf597df55dd505dd419")