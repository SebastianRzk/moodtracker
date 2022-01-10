

def load_and_trim(values, trim_length, property_name):
    if property_name not in values:
        raise Exception('Property {} has to be set'.format(property_name))
    value = str(values[property_name])
    if len(value) > trim_length:
        return value[:trim_length]
    return value


def load_if_set(values, property_name, default_value):
    if property_name not in values or not values[property_name]:
        return default_value
    return values[property_name]
