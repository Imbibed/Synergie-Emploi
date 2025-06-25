package fr.audithor.dto.exceptions

import java.lang.Exception

class UserNotFoundException(val msg: String) : Exception(msg) {
}
